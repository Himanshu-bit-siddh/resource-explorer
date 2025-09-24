import { useQuery } from '@tanstack/react-query';

export function useCancelableFetch({ queryKey, queryFn }) {
  return useQuery({ queryKey, queryFn });
}