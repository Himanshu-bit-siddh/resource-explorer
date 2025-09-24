import { PokemonEndPoint } from "../api-routes";

export const fetchPokemonList = async ({ query, filter, sort, page = 1, limit = 20, favoritesOnly = false, favorites = [] }, { signal } = {}) => {
  const offset = (page - 1) * limit;
  if (favoritesOnly) {
    if (favorites.length === 0) {
      return { results: [], count: 0 };
    }
    
    let results = await Promise.all(
      favorites.map(async (pokemonName) => {
        try {
          const res = await fetch(PokemonEndPoint.DETAIL(pokemonName), { signal });
          return res.json();
        } catch (error) {
          console.error(`Failed to fetch ${pokemonName}:`, error);
          return null;
        }
      })
    );

    results = results.filter(Boolean);

    if (query) {
      results = results.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filter) {
      results = results.filter((p) =>
        p.types.some((t) => t.type.name === filter)
      );
    }

    if (sort === "name_asc") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "name_desc") {
      results.sort((a, b) => b.name.localeCompare(a.name));
    }

    const start = (page - 1) * limit;
    const paginatedResults = results.slice(start, start + limit);
    
    return { results: paginatedResults, count: results.length };
  }
  
  const res = await fetch(`${PokemonEndPoint.LIST}?limit=${limit}&offset=${offset}`, {
    signal
  });
  const data = await res.json();

  let results = await Promise.all(
    data.results.map((item) => 
      fetch(item.url, { signal }).then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch ${item.name}`);
        return res.json();
      })
    )
  );

  if (query) {
    results = results.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (filter) {
    console.log('Filtering by type:', filter);
    results = results.filter((p) => {
      const hasType = p.types.some((t) => t.type.name === filter);
      if (hasType) console.log(`${p.name} has type ${filter}`);
      return hasType;
    });
    console.log('Filtered results count:', results.length);
  }

  if (sort === "name_asc") {
    results.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "name_desc") {
    results.sort((a, b) => b.name.localeCompare(a.name));
  }

  return { results, count: data.count };
};

export const fetchPokemonDetail = async (idOrName, { signal } = {}) => {
  const res = await fetch(PokemonEndPoint.DETAIL(idOrName), { signal });
  if (!res.ok) throw new Error(`Failed to fetch Pokemon: ${idOrName}`);
  return res.json();
};

export const fetchPokemonTypes = async ({ signal } = {}) => {
  const res = await fetch(PokemonEndPoint.TYPES, { signal });
  if (!res.ok) throw new Error('Failed to fetch Pokemon types');
  const data = await res.json();
  return data.results.map((t) => t.name);
};
