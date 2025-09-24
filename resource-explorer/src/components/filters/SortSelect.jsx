import { useSearchParams } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function SortSelect() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newParams.set('sort', e.target.value);
    } else {
      newParams.delete('sort');
    }
    setSearchParams(newParams);
  };

  return (
    <FormControl 
      size="small"
      sx={{ 
        minWidth: 120,
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 2,
          '& fieldset': {
            border: 'none',
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
          },
          '&.Mui-focused': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
          },
        },
        '& .MuiInputLabel-root': {
          color: 'rgba(0, 0, 0, 0.6)',
          fontWeight: 500,
        },
        '& .MuiSelect-select': {
          color: 'rgba(0, 0, 0, 0.87)',
          fontWeight: 500,
        },
      }}
    >
      <InputLabel>Sort</InputLabel>
      <Select value={searchParams.get('sort') || ''} onChange={handleChange} label="Sort">
        <MenuItem value="">ID</MenuItem>
        <MenuItem value="name_asc">Name (A-Z)</MenuItem>
        <MenuItem value="name_desc">Name (Z-A)</MenuItem>
      </Select>
    </FormControl>
  );
}
