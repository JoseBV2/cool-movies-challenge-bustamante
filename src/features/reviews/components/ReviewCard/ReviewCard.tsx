import { css, keyframes } from '@emotion/react';
import { Card, CardContent, Typography, Rating, Box, Chip } from '@mui/material';
import { memo } from 'react';

interface ReviewCardProps {
  review: {
    id: string;
    title: string;
    body?: string | null;
    rating?: number | null;
    movieByMovieId?: {
      id: string;
      title: string;
      releaseDate?: string | null;
    } | null;
    userByUserReviewerId?: {
      id: string;
      name: string;
    } | null;
  };
  index?: number;
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const ReviewCard = ({ review, index = 0 }: ReviewCardProps) => {
  const movie = review.movieByMovieId;
  const user = review.userByUserReviewerId;

  const isTopRated = (review.rating || 0) === 5;

  return (
    <Card
      css={[
        styles.card,
        css`animation: ${fadeInUp} 0.6s ease-out ${index * 0.1}s both;`,
        isTopRated && styles.topRatedCard
      ]}
      elevation={2}
      component="article"
      role="article"
    >
      <CardContent>
        <Box css={styles.header}>
          <Box css={styles.titleSection}>
            <Typography variant="h6" component="h2" css={styles.title}>
              {review.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Review by {user?.name || 'Unknown'}
            </Typography>
          </Box>
          <Box css={styles.ratingSection}>
            <Rating
              value={review.rating || 0}
              readOnly
              precision={1}
              aria-label={`Rating: ${review.rating || 0} out of 5 stars`}
            />
          </Box>
        </Box>

        <Box css={styles.movieInfo}>
          <Chip
            label={movie?.title || 'Unknown Movie'}
            size="small"
            color="primary"
            css={styles.movieChip}
          />
          {movie?.releaseDate && (
            <Typography variant="caption" color="text.secondary">
              Released: {new Date(movie.releaseDate).toLocaleDateString()}
            </Typography>
          )}
        </Box>

        {review.body && (
          <Typography
            variant="body2"
            color="text.secondary"
            css={styles.body}
          >
            {review.body}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const styles = {
  card: css({
    marginBottom: 16,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-4px) scale(1.01)',
      boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
      transition: 'left 0.5s',
    },
    '&:hover::before': {
      left: '100%',
    },
  }),
  topRatedCard: css({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    position: 'relative',
    '&::after': {
      content: '"⭐ TOP RATED"',
      position: 'absolute',
      top: 12,
      right: 12,
      background: 'rgba(255, 215, 0, 0.9)',
      color: '#333',
      padding: '4px 12px',
      borderRadius: 12,
      fontSize: '0.75rem',
      fontWeight: 700,
      letterSpacing: '0.5px',
      boxShadow: '0 2px 8px rgba(255, 215, 0, 0.3)',
      animation: `${shimmer} 2s infinite linear`,
      backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
      backgroundSize: '1000px 100%',
    },
    '& .MuiTypography-root': {
      color: 'white',
    },
    '& .MuiChip-root': {
      backgroundColor: 'rgba(255,255,255,0.2)',
      color: 'white',
      backdropFilter: 'blur(10px)',
    },
  }),
  header: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 16,
  }),
  titleSection: css({
    flex: 1,
    minWidth: 0,
  }),
  title: css({
    fontWeight: 600,
    marginBottom: 4,
  }),
  ratingSection: css({
    display: 'flex',
    alignItems: 'center',
  }),
  movieInfo: css({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  }),
  movieChip: css({
    fontWeight: 500,
  }),
  body: css({
    marginTop: 12,
    lineHeight: 1.6,
  }),
};

export default memo(ReviewCard);
