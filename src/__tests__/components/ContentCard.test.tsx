import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContentCard, { ContentItem } from '../../components/Dashboard/ContentCard';

// Mock lucide-react Heart icon to expose a stable test id and class handling
jest.mock('lucide-react', () => ({
  Heart: ({ className, size, onClick }: any) => (
    <span data-testid="heart-icon" className={className} onClick={onClick} />
  ),
}));

const mockWindowOpen = jest.fn();
// @ts-ignore
window.open = mockWindowOpen;

const makeItem = (overrides: Partial<ContentItem> = {}): ContentItem => ({
  id: '1',
  type: 'news',
  title: 'Test Title',
  description: 'Test description',
  content: 'Test content',
  image: 'https://example.com/image.jpg',
  url: 'https://example.com',
  category: 'Tech',
  source: 'Example Source',
  publishedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  ...overrides,
});

describe('ContentCard (integrated)', () => {
  beforeEach(() => {
    mockWindowOpen.mockClear();
  });

  it('renders and shows correct texts for types', () => {
    const news = makeItem({ type: 'news' });
    const rec = makeItem({ type: 'recommendation', id: '2' });
    const post = makeItem({ type: 'post', id: '3' });

    const { rerender } = render(<ContentCard item={news} onFavorite={jest.fn()} isFavorite={false} />);
    expect(screen.getByTestId('main-action-button')).toHaveTextContent('Read Article');

    rerender(<ContentCard item={rec} onFavorite={jest.fn()} isFavorite={false} />);
    expect(screen.getByTestId('main-action-button')).toHaveTextContent('Watch Now');

    rerender(<ContentCard item={post} onFavorite={jest.fn()} isFavorite={false} />);
    expect(screen.getByTestId('main-action-button')).toHaveTextContent('View Post');
  });

  it('handles favorite clicks and aria labels', () => {
    const item = makeItem();
    const onFavorite = jest.fn();
    const { rerender } = render(<ContentCard item={item} onFavorite={onFavorite} isFavorite={false} />);

    const favBtn = screen.getByTestId('favorite-button');
    expect(favBtn).toHaveAttribute('aria-label', 'Add to favorites');
    fireEvent.click(favBtn);
    expect(onFavorite).toHaveBeenCalledWith(item);

    rerender(<ContentCard item={item} onFavorite={onFavorite} isFavorite={true} />);
    expect(screen.getByTestId('favorite-button')).toHaveAttribute('aria-label', 'Remove from favorites');
    expect(screen.getByTestId('heart-icon').className).toMatch(/red|fill-red/);
  });

  it('stops propagation when favorite clicked', () => {
    const item = makeItem();
    const onFavorite = jest.fn();
    const parentClick = jest.fn();
    render(
      <div onClick={parentClick}>
        <ContentCard item={item} onFavorite={onFavorite} isFavorite={false} />
      </div>
    );

    fireEvent.click(screen.getByTestId('favorite-button'));
    expect(onFavorite).toHaveBeenCalledTimes(1);
    expect(parentClick).not.toHaveBeenCalled();
  });

  it('opens url when main button clicked and disables when missing', () => {
    const item = makeItem();
    const onFavorite = jest.fn();
    const { rerender } = render(<ContentCard item={item} onFavorite={onFavorite} isFavorite={false} />);

    fireEvent.click(screen.getByTestId('main-action-button'));
    expect(mockWindowOpen).toHaveBeenCalledWith(item.url, '_blank');

    const noUrl = makeItem({ url: '' });
    rerender(<ContentCard item={noUrl} onFavorite={onFavorite} isFavorite={false} />);
    const btn = screen.getByTestId('main-action-button');
    expect(btn).toBeDisabled();
  });

  it('renders and hides image on error and omits when not provided', () => {
    const item = makeItem();
    const { rerender } = render(<ContentCard item={item} onFavorite={jest.fn()} isFavorite={false} />);

    const img = screen.getByAltText(item.title) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    fireEvent.error(img);
    expect(img.style.display).toBe('none');

    const noImage = makeItem({ image: undefined });
    rerender(<ContentCard item={noImage} onFavorite={jest.fn()} isFavorite={false} />);
    expect(screen.queryByAltText(noImage.title)).toBeNull();
  });

  it('renders metadata, title and description', () => {
    const item = makeItem();
    render(<ContentCard item={item} onFavorite={jest.fn()} isFavorite={false} />);
    expect(screen.getByTestId('content-source')).toHaveTextContent(item.source);
    expect(screen.getByTestId('content-category')).toHaveTextContent(item.category);
    expect(screen.getByTestId('content-title')).toHaveTextContent(item.title);
    expect(screen.getByTestId('content-description')).toHaveTextContent(item.description!);
  });

  it('includes dark-mode classes for compatibility', () => {
    const item = makeItem();
    render(<ContentCard item={item} onFavorite={jest.fn()} isFavorite={false} />);
    expect(screen.getByTestId('content-card').className).toMatch(/dark:bg-gray-800/);
  });
});