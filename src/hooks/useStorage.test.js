import React from 'react';
import {act, renderHook, waitFor} from '@testing-library/react-native';
import {useStorage} from './useStorage';

const cache = {};
jest.mock('expo-file-system', () => ({
  documentDirectory: './directory/',
  writeAsStringAsync: (fileUri, data) => {
    return new Promise(resolve => {
      cache[fileUri] = data;
      resolve();
    });
  },
  readAsStringAsync: fileUri => {
    return new Promise(resolve => {
      resolve(cache[fileUri]);
    });
  },
  deleteAsync: fileUri => {
    return new Promise(resolve => {
      delete cache[fileUri];
      resolve();
    });
  },
  getInfoAsync: fileUri => {
    return new Promise(resolve => {
      resolve({
        exists: Object.keys(cache).includes(fileUri),
      });
    });
  },
}));

describe('useStorage', () => {
  test('should update and delete data', async () => {
    const key = 'data';
    const newValue = {name: 'Mike'};
    const {result} = renderHook(() => useStorage(key));
    const [, setData, deleteData] = result.current;
    expect(result.current[0]).toBeNull();
    act(() => setData(newValue));
    expect(result.current[0]).toEqual(newValue);
    act(() => deleteData());
    expect(result.current[0]).toBeNull();
  });

  test('should read data from file', async () => {
    const key = 'saved_data';
    const value = {name: 'John'};
    const {result} = renderHook(() => useStorage(key));
    act(() => {
      result.current[1](value);
    });
    await waitFor(() => expect(result.current[0]).not.toBeNull());
    const {result: result2} = renderHook(() => useStorage(key));
    await waitFor(() => expect(result2.current[0]).not.toBeNull());
    expect(JSON.stringify(result2.current[0])).toBe(JSON.stringify(value));
  });
});
