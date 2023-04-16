import {render, screen} from '@testing-library/react-native';
import React from 'react';
import PartialLoading from './PartialLoading';

describe('<PartialLoading />', () => {
  it('should render PartialLoading', () => {
    render(<PartialLoading />);
    expect(screen.getByText('Procurando suas informações em:')).toBeDefined();
  });
});
