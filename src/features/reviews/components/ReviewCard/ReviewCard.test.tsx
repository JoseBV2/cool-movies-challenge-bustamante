import { render, screen } from '@testing-library/react';
import ReviewCard from './ReviewCard';

describe('ReviewCard', () => {
  const mockReview: any = {
    id: '1',
    title: 'Amazing Movie',
    body: 'This was a fantastic film with great acting.',
    rating: 5,
    movieByMovieId: {
      id: 'movie-1',
      title: 'Test Movie',
      releaseDate: '2023-01-15',
    },
    userByUserReviewerId: {
      id: 'user-1',
      name: 'John Doe',
    },
  };

  it('renders review title', () => {
    render(<ReviewCard review={mockReview} />);
    expect(screen.getByText('Amazing Movie')).toBeInTheDocument();
  });

  it('renders reviewer name', () => {
    render(<ReviewCard review={mockReview} />);
    expect(screen.getByText(/Review by John Doe/i)).toBeInTheDocument();
  });

  it('renders movie title', () => {
    render(<ReviewCard review={mockReview} />);
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });

  it('renders review body', () => {
    render(<ReviewCard review={mockReview} />);
    expect(screen.getByText('This was a fantastic film with great acting.')).toBeInTheDocument();
  });

  it('renders rating', () => {
    render(<ReviewCard review={mockReview} />);
    // Rating component will have aria-label with the rating value
    const ratingElement = screen.getByRole('img', { name: /5 stars/i });
    expect(ratingElement).toBeInTheDocument();
  });

  it('renders without body when body is null', () => {
    const reviewWithoutBody = { ...mockReview, body: null };
    render(<ReviewCard review={reviewWithoutBody} />);
    expect(screen.queryByText('This was a fantastic film with great acting.')).not.toBeInTheDocument();
  });

  it('renders with unknown user when user is null', () => {
    const reviewWithoutUser = { ...mockReview, userByUserReviewerId: null };
    render(<ReviewCard review={reviewWithoutUser} />);
    expect(screen.getByText(/Review by Unknown/i)).toBeInTheDocument();
  });
});
