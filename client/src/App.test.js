import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue({
      watch: [],
      watched: [],
    }),
  });
});

describe('App', () => {
  it('should render correctly', () => {
    render(<App />);
    const headerElement = screen.getByText(/Movie List/i);
    expect(headerElement).toBeInTheDocument();
  });

  describe('changeList', () => {
    it('should change the list to watch', async () => {
      render(<App />);
      const watchTab = screen.getByRole('button', { name: /watch list/i });

      // Act
      fireEvent.click(watchTab);
      const h2Element = screen.getByRole('heading', { name: /watch list/i });

      // Assert
      expect(h2Element).toBeInTheDocument();
    });

    it('should change the list to watched', async () => {
      render(<App />);
      const watchedTab = screen.getByRole('button', { name: /watched list/i });

      // Act
      fireEvent.click(watchedTab);
      const h2Element = screen.getByRole('heading', { name: /watched list/i });

      // Assert
      expect(h2Element).toBeInTheDocument();
    });
  });
});
