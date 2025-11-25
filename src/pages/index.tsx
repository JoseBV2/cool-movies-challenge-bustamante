import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to reviews page on mount
    router.push('/reviews');
  }, [router]);

  return null;
};

export default Home;
