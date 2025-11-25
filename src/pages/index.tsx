import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CircularProgress, Box } from '@mui/material';

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to reviews page on mount
    router.push('/reviews');
  }, [router]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Home;
