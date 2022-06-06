import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FollowersList from '../FollowersList';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

const mockResponse = {
  data: {
    results: [
      {
        name: {
          first: 'Russell',
          last: 'Chan',
        },
        picture: {
          large: 'https://randomuser.me/api/portraits/men/18.jpg',
        },
        login: {
          username: 'jrchan30',
        },
      },
    ],
  },
};

const MockFollowersList = () => (
  <BrowserRouter>
    <FollowersList />
  </BrowserRouter>
);

jest.mock('axios');

describe('FollowersList', () => {
  //   afterEach(cleanup);

  it('should render follower item', async () => {
    act(() => {
      render(<MockFollowersList />);
      axios.get.mockResolvedValue(mockResponse);
    });
    // axios.mockResolvedValueOnce(mockResponse);
    const followerDivElement = await screen.findByTestId('follower-item-0');
    screen.debug();
    // expect(axios.get).toHaveBeenCalled();
    expect(followerDivElement).toBeInTheDocument();
  });

  //   it('should render multiple follower items', async () => {
  //     render(<MockFollowersList />);
  //     const followerDivElements = await screen.findAllByTestId(/follower-item/i);
  //     expect(followerDivElements.length).toBe(5);
  //   });
});
