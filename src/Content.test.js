import React from 'react';
import {render, screen} from '@testing-library/react-native';
import Content from './Content';

describe('<Content />', () => {
  it('should render LoginPage', () => {
    render(<Content />);
    expect(screen.getByText('Entrar')).toBeDefined();
  });
});
