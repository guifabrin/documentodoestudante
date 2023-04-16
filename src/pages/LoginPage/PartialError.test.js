import {fireEvent, render, screen} from '@testing-library/react-native';
import React from 'react';
import PartialError from './PartialError';

describe('<PartialError />', () => {
  it('should render PartialError and calls reset function', () => {
    const reset = jest.fn();
    render(<PartialError reset={reset} />).toJSON();
    fireEvent.press(screen.getByText('Tentar novamente'));
    expect(reset).toBeCalled();
  });
});
