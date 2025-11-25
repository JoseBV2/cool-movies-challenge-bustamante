import { css, keyframes } from '@emotion/react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Fade,
  Slide,
} from '@mui/material';
import { memo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../state';
import { reviewsActions } from '../../state';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

type MovieNode = {
  id: string;
  title: string;
  releaseDate?: string | null;
};

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddReviewDialog = () => {
  const dispatch = useAppDispatch();
  const { isDialogOpen, movies, loading, error } = useAppSelector((state) => state.reviews);
  const currentUser = useAppSelector((state) => state.example.fetchData);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [rating, setRating] = useState<number>(3);
  const [selectedMovieId, setSelectedMovieId] = useState('');

  const handleClose = () => {
    dispatch(reviewsActions.closeDialog());
    setTitle('');
    setBody('');
    setRating(3);
    setSelectedMovieId('');
  };

  const handleSubmit = () => {
    if (!title.trim() || !selectedMovieId) {
      return;
    }

    // Get the current user ID from the example state
    // In a real app, this would come from auth context
    const userId = (currentUser as any)?.currentUser?.id || '65549e6a-2389-42c5-909a-4475fdbb3e69';

    dispatch(
      reviewsActions.createReview({
        title: title.trim(),
        body: body.trim(),
        rating,
        movieId: selectedMovieId,
        userReviewerId: userId,
      })
    );
  };

  const isValid = title.trim() && selectedMovieId;

  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      aria-labelledby="add-review-dialog-title"
      aria-describedby="add-review-dialog-description"
    >
      <DialogTitle id="add-review-dialog-title">Add New Movie Review</DialogTitle>
      <DialogContent>
        <Box css={styles.form} role="form" aria-label="Add movie review form">
          {error && (
            <Alert severity="error" css={styles.alert} role="alert">
              {error}
            </Alert>
          )}

          <FormControl fullWidth required>
            <InputLabel id="movie-select-label">Movie</InputLabel>
            <Select
              labelId="movie-select-label"
              id="movie-select"
              value={selectedMovieId}
              label="Movie"
              onChange={(e) => setSelectedMovieId(e.target.value)}
              disabled={loading}
            >
              {movies.map((movie: MovieNode) => (
                <MenuItem key={movie.id} value={movie.id}>
                  {movie.title}
                  {movie.releaseDate && ` (${new Date(movie.releaseDate).getFullYear()})`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            autoFocus
            required
            id="review-title"
            label="Review Title"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            placeholder="e.g., Amazing Movie!"
          />

          <Box css={styles.ratingBox}>
            <Typography component="legend" id="rating-label">Rating</Typography>
            <Rating
              name="review-rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue || 1);
              }}
              disabled={loading}
              size="large"
              aria-labelledby="rating-label"
              aria-label={`Select rating: ${rating} out of 5 stars`}
            />
          </Box>

          <TextField
            id="review-body"
            label="Review (Optional)"
            multiline
            rows={4}
            fullWidth
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={loading}
            placeholder="Share your thoughts about this movie..."
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!isValid || loading}
          css={isValid && !loading ? styles.submitButton : undefined}
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles = {
  form: css({
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    paddingTop: 8,
  }),
  ratingBox: css({
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    '& .MuiRating-icon': {
      transition: 'transform 0.2s',
    },
    '& .MuiRating-iconFilled': {
      animation: `${pulse} 0.3s ease-in-out`,
    },
  }),
  alert: css({
    marginBottom: 8,
  }),
  submitButton: css({
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 0,
      height: 0,
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.5)',
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.6s, height 0.6s',
    },
    '&:hover::before': {
      width: '300px',
      height: '300px',
    },
  }),
};

export default memo(AddReviewDialog);
