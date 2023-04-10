import React from 'react';
import {render, screen} from '@testing-library/react-native';
import Content from './Content';

jest.mock('react-native-remote-svg', () => () => 'SVGImage');
jest.mock('react-native-vector-icons/Ionicons', () => () => 'Ionicons');

describe('<Content />', () => {
  it('should render LoginPage', () => {
    render(<Content />);
    expect(screen.getByText('Entrar')).toBeDefined();
  });
});
