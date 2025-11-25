export { actions as reviewsActions } from './slice';
export { default as reviewsReducer } from './slice';
import { combineEpics } from 'redux-observable';
import { fetchReviewsEpic, fetchMoviesEpic, createReviewEpic } from './epics';

export const reviewsEpics = combineEpics(fetchReviewsEpic as any, fetchMoviesEpic as any, createReviewEpic as any);
