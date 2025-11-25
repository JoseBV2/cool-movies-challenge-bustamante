import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllMovieReviewsQuery, AllMoviesQuery } from '../../../generated/graphql';

type ReviewNode = NonNullable<NonNullable<AllMovieReviewsQuery['allMovieReviews']>['nodes'][0]>;
type MovieNode = NonNullable<NonNullable<AllMoviesQuery['allMovies']>['nodes'][0]>;

interface ReviewsState {
  reviews: ReviewNode[];
  movies: MovieNode[];
  loading: boolean;
  error: string | null;
  isDialogOpen: boolean;
}

const initialState: ReviewsState = {
  reviews: [],
  movies: [],
  loading: false,
  error: null,
  isDialogOpen: false,
};

export const slice = createSlice({
  initialState,
  name: 'reviews',
  reducers: {
    fetchReviews: (state) => {
      state.loading = true;
      state.error = null;
    },
    reviewsLoaded: (state, action: PayloadAction<{ reviews: ReviewNode[] }>) => {
      state.reviews = action.payload.reviews;
      state.loading = false;
    },
    reviewsLoadError: (state, action: PayloadAction<{ error: string }>) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    fetchMovies: (state) => {
      state.loading = true;
      state.error = null;
    },
    moviesLoaded: (state, action: PayloadAction<{ movies: MovieNode[] }>) => {
      state.movies = action.payload.movies;
      state.loading = false;
    },
    moviesLoadError: (state, action: PayloadAction<{ error: string }>) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    createReview: (state, action: PayloadAction<{ title: string; body: string; rating: number; movieId: string; userReviewerId: string }>) => {
      state.loading = true;
      state.error = null;
    },
    reviewCreated: (state) => {
      state.loading = false;
      state.isDialogOpen = false;
    },
    reviewCreateError: (state, action: PayloadAction<{ error: string }>) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    openDialog: (state) => {
      state.isDialogOpen = true;
      state.error = null;
    },
    closeDialog: (state) => {
      state.isDialogOpen = false;
      state.error = null;
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;
