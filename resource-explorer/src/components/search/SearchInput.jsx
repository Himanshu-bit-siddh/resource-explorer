import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from './useDebounce';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

export default function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      newParams.set('q', debouncedSearch);
    } else {
      newParams.delete('q');
    }
    newParams.delete('page');
    setSearchParams(newParams);
  }, [debouncedSearch, setSearchParams]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <TextField
      placeholder="Search Pokémon..."
      variant="outlined"
      size="small"
      value={search}
      onChange={handleChange}
      sx={{
        minWidth: { xs: '100%', sm: 250 },
        '& .MuiOutlinedInput-root': {
          backgroundColor: (theme) => theme.palette.mode === 'dark'
            ? 'rgba(148, 163, 184, 0.15)'
            : 'rgba(255, 255, 255, 0.9)',
          borderRadius: 2,
          '& fieldset': {
            border: (theme) => `1px solid ${
              theme.palette.mode === 'dark'
                ? 'rgba(148, 163, 184, 0.3)'
                : 'rgba(226, 232, 240, 0.6)'
            }`,
          },
          '&:hover': {
            backgroundColor: (theme) => theme.palette.mode === 'dark'
              ? 'rgba(148, 163, 184, 0.2)'
              : 'rgba(255, 255, 255, 0.95)',
          },
          '&.Mui-focused': {
            backgroundColor: (theme) => theme.palette.mode === 'dark'
              ? 'rgba(148, 163, 184, 0.25)'
              : 'rgba(255, 255, 255, 1)',
            boxShadow: (theme) => `0 0 0 2px ${
              theme.palette.mode === 'dark'
                ? 'rgba(100, 181, 246, 0.3)'
                : 'rgba(74, 144, 226, 0.2)'
            }`,
          },
        },
        '& .MuiInputBase-input': {
          color: (theme) => theme.palette.text.primary,
          fontWeight: 500,
          '&::placeholder': {
            color: (theme) => theme.palette.text.secondary,
            opacity: 1,
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: (theme) => theme.palette.text.secondary }} />
          </InputAdornment>
        ),
      }}
    />
  );
}
