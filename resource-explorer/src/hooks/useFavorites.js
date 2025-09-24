import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const toggleFavorite = (name) => {
    setFavorites(prev => {
      const newFavs = prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name];
      localStorage.setItem('favorites', JSON.stringify(newFavs));
      return newFavs;
    });
  };

  return { favorites, toggleFavorite };
}