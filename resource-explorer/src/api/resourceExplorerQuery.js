import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchPokemonList, fetchPokemonDetail, fetchPokemonTypes } from "./resourceApi";

import {QUERY_KEYS} from "./queryKeys";

export const usePokemonList = (params) => {
  return useQuery({
    queryKey: [QUERY_KEYS.POKEMON_LIST, params],
    queryFn: () => fetchPokemonList(params),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePokemonListInfinite = (params) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.POKEMON_LIST_INFINITE, params],
    queryFn: ({ pageParam = 1, signal }) => 
      fetchPokemonList({ ...params, page: pageParam }, { signal }),
    getNextPageParam: (lastPage, pages) => {
      const totalPages = Math.ceil(lastPage.count / (params.limit || 20));
      const nextPage = pages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

export const usePokemonDetail = (idOrName) => {
  return useQuery({
    queryKey: [QUERY_KEYS.POKEMON_DETAIL, idOrName],
    queryFn: ({ signal }) => fetchPokemonDetail(idOrName, { signal }),
    enabled: !!idOrName,
  });
};

export const usePokemonTypes = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.POKEMON_TYPES],
    queryFn: ({ signal }) => fetchPokemonTypes({ signal }),
  });
};
