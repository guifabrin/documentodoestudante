import React from 'react';
import {renderHook} from '@testing-library/react-native';
import {useStorage} from './useStorage';

describe('useStorage', () => {
  it('should save a value', async () => {
    const {result} = renderHook(() => useStorage('@test'));
    const [value, setValue] = result.current;
    expect(value).toBe(null);
    await setValue('super_test');
    expect(result.current[0]).toBe('super_test');
  });
});
