import React from 'react';
import {render, screen} from '@testing-library/react-native';
import App from './App';

jest.mock('react-native-remote-svg', () => () => 'SVGImage');
jest.mock('react-native-vector-icons/Ionicons', () => () => 'Ionicons');

let mockData = null;
let mockDeleteData = jest.fn();
jest.mock('./src/hooks/useStorage', () => ({
  useStorage: () => [mockData, jest.fn(), mockDeleteData],
}));
describe('App', () => {
  it('should render App', () => {
    render(<App />);
    expect(screen.getByText('Entrar')).toBeDefined();
  });
});
