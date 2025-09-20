import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
  dependencies?: any[];
}

export function useApi<T>(
  apiCall: () => Promise<any>,
  options: UseApiOptions = {}
): UseApiState<T> & { refetch: () => Promise<void> } {
  const { immediate = true, dependencies = [] } = options;
  
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const fetchData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await apiCall();
      setState({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, dependencies);

  return {
    ...state,
    refetch: fetchData,
  };
}

// Specific hooks for common API calls
export function useDashboardStats() {
  return useApi(() => apiService.getDashboardStats());
}

export function useRecentActivities() {
  return useApi(() => apiService.getRecentActivities());
}

export function useAIAlerts() {
  return useApi(() => apiService.getAIAlerts());
}

export function useClassPerformance() {
  return useApi(() => apiService.getClassPerformance());
}

// Generic mutation hook
export function useMutation<T = any>(
  mutationFn: (data: any) => Promise<any>
) {
  const [state, setState] = useState({
    loading: false,
    error: null as string | null,
    data: null as T | null,
  });

  const mutate = async (data: any) => {
    try {
      setState({ loading: true, error: null, data: null });
      const response = await mutationFn(data);
      setState({ loading: false, error: null, data: response.data });
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState({ loading: false, error: errorMessage, data: null });
      throw error;
    }
  };

  return {
    ...state,
    mutate,
  };
}