import { Typography } from '@mui/material';

export default function Placeholder({ placeholder }: { placeholder: string }) {
  return (
    <Typography
      sx={{
        position: 'absolute',
        top: {
          xs: 120,
          sm: 90,
          md: 60,
        },
        left: 16,
        color: '#999',
        pointerEvents: 'none',
        fontSize: 16,
      }}
    >
      {placeholder}
    </Typography>
  );
}
