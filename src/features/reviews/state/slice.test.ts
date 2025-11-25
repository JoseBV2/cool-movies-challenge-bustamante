import reducer, { actions } from './slice';

describe('reviews slice', () => {
  const initialState = {
    reviews: [],
    movies: [],
    loading: false,
    error: null,
    isDialogOpen: false,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchReviews', () => {
    const actual = reducer(initialState, actions.fetchReviews());
    expect(actual.loading).toBe(true);
    expect(actual.error).toBe(null);
  });

  it('should handle reviewsLoaded', () => {
    const mockReviews: any = [
      { id: '1', title: 'Great movie', rating: 5 },
      { id: '2', title: 'Good movie', rating: 4 },
    ];
    const actual = reducer(
      { ...initialState, loading: true },
      actions.reviewsLoaded({ reviews: mockReviews })
    );
    expect(actual.reviews).toEqual(mockReviews);
    expect(actual.loading).toBe(false);
  });

  it('should handle reviewsLoadError', () => {
    const errorMessage = 'Failed to load reviews';
    const actual = reducer(
      { ...initialState, loading: true },
      actions.reviewsLoadError({ error: errorMessage })
    );
    expect(actual.error).toBe(errorMessage);
    expect(actual.loading).toBe(false);
  });

  it('should handle openDialog', () => {
    const actual = reducer(initialState, actions.openDialog());
    expect(actual.isDialogOpen).toBe(true);
    expect(actual.error).toBe(null);
  });

  it('should handle closeDialog', () => {
    const actual = reducer(
      { ...initialState, isDialogOpen: true, error: 'Some error' },
      actions.closeDialog()
    );
    expect(actual.isDialogOpen).toBe(false);
    expect(actual.error).toBe(null);
  });

  it('should handle createReview', () => {
    const reviewData = {
      title: 'New Review',
      body: 'Great movie!',
      rating: 5,
      movieId: 'movie-123',
      userReviewerId: 'user-123',
    };
    const actual = reducer(initialState, actions.createReview(reviewData));
    expect(actual.loading).toBe(true);
    expect(actual.error).toBe(null);
  });

  it('should handle reviewCreated', () => {
    const actual = reducer(
      { ...initialState, loading: true, isDialogOpen: true },
      actions.reviewCreated()
    );
    expect(actual.loading).toBe(false);
    expect(actual.isDialogOpen).toBe(false);
  });

  it('should handle reviewCreateError', () => {
    const errorMessage = 'Failed to create review';
    const actual = reducer(
      { ...initialState, loading: true },
      actions.reviewCreateError({ error: errorMessage })
    );
    expect(actual.error).toBe(errorMessage);
    expect(actual.loading).toBe(false);
  });
});
