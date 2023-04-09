import React from 'react';
import {render, screen} from '@testing-library/react-native';
import LoginPage from './LoginPage';

describe('<LoginPage />', () => {
  it('should render LoginPage', () => {
    render(<LoginPage />);
    expect(screen.getByText('Entrar')).toBeDefined();
  });
});
