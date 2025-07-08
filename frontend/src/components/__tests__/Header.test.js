import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../store';
import Header from '../Header';

test('renders header with login and sign up buttons', () => {
  render(
    <Provider store={store}>
      <Router>
        <Header />
      </Router>
    </Provider>
  );
  const loginButton = screen.getByText(/login/i);
  const signUpButton = screen.getByText(/sign up/i);
  expect(loginButton).toBeInTheDocument();
  expect(signUpButton).toBeInTheDocument();
});