import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { filter, switchMap, map, catchError } from 'rxjs/operators';

import { actions, SliceAction } from './slice';
import { RootState } from '../../../state/store';
import { EpicDependencies } from '../../../state/types';
import {
  AllMovieReviewsDocument,
  AllMovieReviewsQuery,
  AllMoviesDocument,
  AllMoviesQuery,
  CreateMovieReviewDocument,
  CreateMovieReviewMutation,
  CreateMovieReviewMutationVariables,
} from '../../../generated/graphql';

export const fetchReviewsEpic: Epic<
  SliceAction['fetchReviews'],
  any,
  RootState,
  EpicDependencies
> = (action$, state$, { client }) =>
  action$.pipe(
    filter(actions.fetchReviews.match),
    switchMap(() =>
      from(
        client.query<AllMovieReviewsQuery>({
          query: AllMovieReviewsDocument,
          fetchPolicy: 'network-only',
        })
      ).pipe(
        map((result) =>
          actions.reviewsLoaded({ reviews: (result.data.allMovieReviews?.nodes || []).filter((n): n is NonNullable<typeof n> => n !== null) })
        ),
        catchError((error) =>
          of(actions.reviewsLoadError({ error: error.message || 'Failed to fetch reviews' }))
        )
      )
    )
  );

export const fetchMoviesEpic: Epic<
  SliceAction['fetchMovies'],
  any,
  RootState,
  EpicDependencies
> = (action$, state$, { client }) =>
  action$.pipe(
    filter(actions.fetchMovies.match),
    switchMap(() =>
      from(
        client.query<AllMoviesQuery>({
          query: AllMoviesDocument,
          fetchPolicy: 'network-only',
        })
      ).pipe(
        map((result) =>
          actions.moviesLoaded({ movies: (result.data.allMovies?.nodes || []).filter((n): n is NonNullable<typeof n> => n !== null) })
        ),
        catchError((error) =>
          of(actions.moviesLoadError({ error: error.message || 'Failed to fetch movies' }))
        )
      )
    )
  );

export const createReviewEpic: Epic<
  SliceAction['createReview'],
  any,
  RootState,
  EpicDependencies
> = (action$, state$, { client }) =>
  action$.pipe(
    filter(actions.createReview.match),
    switchMap((action) =>
      from(
        client.mutate<CreateMovieReviewMutation, CreateMovieReviewMutationVariables>({
          mutation: CreateMovieReviewDocument,
          variables: {
            input: {
              movieReview: {
                title: action.payload.title,
                body: action.payload.body,
                rating: action.payload.rating,
                movieId: action.payload.movieId,
                userReviewerId: action.payload.userReviewerId,
              },
            },
          },
        })
      ).pipe(
        switchMap(() => [
          actions.reviewCreated(),
          actions.fetchReviews(), // Refresh the list
        ]),
        catchError((error) =>
          of(actions.reviewCreateError({ error: error.message || 'Failed to create review' }))
        )
      )
    )
  );
