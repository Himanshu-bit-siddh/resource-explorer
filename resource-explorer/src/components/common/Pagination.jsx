import { Pagination } from '@mui/material';

export default function PaginationControls({ page, totalPages, onPageChange }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Pagination
        count={totalPages}
        page={Number(page)}
        onChange={(e, newPage) => onPageChange(newPage)}
        color="primary"
      />
    </div>
  );
}