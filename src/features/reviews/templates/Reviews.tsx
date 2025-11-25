import { css, keyframes } from '@emotion/react';
import {
  Paper,
  Typography,
  Button,
  CircularProgress,
  Box,
  Container,
  Alert,
  Fab,
  Zoom,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../state';
import { reviewsActions } from '../state';
import { ReviewCard } from '../components/ReviewCard';
import { AddReviewDialog } from '../components/AddReviewDialog';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Reviews = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { reviews, loading, error } = useAppSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(reviewsActions.fetchReviews());
    dispatch(reviewsActions.fetchMovies());
  }, [dispatch]);

  // Sort reviews by rating (5 stars first, then 4, 3, 2, 1)
  const sortedReviews = [...reviews].sort((a, b) => {
    const ratingA = a.rating || 0;
    const ratingB = b.rating || 0;
    return ratingB - ratingA; // Descending order
  });

  const handleAddReview = () => {
    dispatch(reviewsActions.openDialog());
  };

  return (
    <div css={styles.root}>
      <Paper elevation={3} css={css(styles.navBar, { background: theme.palette.primary.main })} component="header" role="banner">
        <Typography css={styles.navTitle} component="h1">EcoPortal - Movie Reviews</Typography>
      </Paper>

      <Container maxWidth="md" css={styles.container} component="main" role="main">
        <Box css={styles.header}>
          <Typography variant="h2" component="h2" css={styles.pageTitle}>
            Movie Reviews
          </Typography>
          <Zoom in timeout={500}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddReview}
              size="large"
              aria-label="Add new movie review"
              css={styles.addButton}
            >
              Add Review
            </Button>
          </Zoom>
        </Box>

        {error && (
          <Alert severity="error" css={styles.alert}>
            {error}
          </Alert>
        )}

        {loading && reviews.length === 0 ? (
          <Box css={styles.loadingBox} role="status" aria-live="polite" aria-label="Loading movie reviews">
            <CircularProgress aria-label="Loading spinner" />
            <Typography variant="body1" css={styles.loadingText}>
              Loading reviews...
            </Typography>
          </Box>
        ) : reviews.length === 0 ? (
          <Paper css={styles.emptyState} elevation={0} role="status">
            <Typography variant="h3" component="h3" color="text.secondary">
              No reviews yet
            </Typography>
            <Typography variant="body2" color="text.secondary" css={styles.emptyText}>
              Be the first to add a movie review!
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddReview}
              css={styles.emptyButton}
              aria-label="Add your first movie review"
            >
              Add First Review
            </Button>
          </Paper>
        ) : (
          <Box css={styles.reviewsList} component="section" aria-label="Movie reviews list">
            {sortedReviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </Box>
        )}

        <Fab
          color="primary"
          aria-label="Add new movie review"
          css={styles.fab}
          onClick={handleAddReview}
          title="Add new movie review"
        >
          <AddIcon />
        </Fab>
      </Container>

      <AddReviewDialog />
    </div>
  );
};

const styles = {
  root: css({
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
  }),
  navBar: css({
    height: 64,
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    borderRadius: 0,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  }),
  navTitle: css({
    color: 'white',
    fontSize: '1.25rem',
    fontWeight: 600,
  }),
  container: css({
    paddingTop: 32,
    paddingBottom: 32,
    flex: 1,
  }),
  header: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    flexWrap: 'wrap',
    gap: 16,
  }),
  pageTitle: css({
    fontWeight: 700,
    color: '#333',
    animation: `${slideDown} 0.6s ease-out`,
  }),
  addButton: css({
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 6px 20px rgba(107, 70, 193, 0.4)',
    },
    '&:active': {
      transform: 'scale(0.98)',
    },
  }),
  loadingBox: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 64,
    gap: 16,
  }),
  loadingText: css({
    color: 'text.secondary',
  }),
  alert: css({
    marginBottom: 24,
  }),
  emptyState: css({
    padding: 64,
    textAlign: 'center',
    backgroundColor: 'white',
    border: '2px dashed #e0e0e0',
  }),
  emptyText: css({
    marginTop: 8,
    marginBottom: 24,
  }),
  emptyButton: css({
    marginTop: 8,
  }),
  reviewsList: css({
    display: 'flex',
    flexDirection: 'column',
  }),
  fab: css({
    position: 'fixed',
    bottom: 24,
    right: 24,
    '@media (min-width: 600px)': {
      display: 'none',
    },
  }),
};

export default memo(Reviews);
