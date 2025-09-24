import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemonTypes } from '../../api/resourceApi';
import { QUERY_KEYS } from '../../api/queryKeys';
import { FormControl, InputLabel, Select, MenuItem, Skeleton } from '@mui/material';

export default function FilterSelect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: types = [], isLoading } = useQuery({
    queryKey: [QUERY_KEYS.POKEMON_TYPES],
    queryFn: fetchPokemonTypes,
  });

  const handleChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newParams.set('filter', e.target.value);
    } else {
      newParams.delete('filter');
    }
    newParams.delete('page');
    setSearchParams(newParams);
  };

  if (isLoading) {
    return (
      <Skeleton 
        variant="rounded" 
        width={120} 
        height={40} 
        sx={{ borderRadius: 2 }}
      />
    );
  }

  return (
    <FormControl 
      size="small"
      sx={{ 
        minWidth: 120,
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
        '& .MuiInputLabel-root': {
          color: (theme) => theme.palette.text.secondary,
          fontWeight: 500,
        },
        '& .MuiSelect-select': {
          color: (theme) => theme.palette.text.primary,
          fontWeight: 500,
        },
      }}
    >
      <InputLabel>Type</InputLabel>
      <Select value={searchParams.get('filter') || ''} onChange={handleChange} label="Type">
        <MenuItem value="">All Types</MenuItem>
        {types.map(type => (
          <MenuItem key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
