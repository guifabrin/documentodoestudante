import {useEffect, useState} from 'react';
import {Storage} from 'expo-storage';

export function useStorage(key) {
  const [data, _setData] = useState(null);
  const setData = value => {
    _setData(value);
    return Storage.setItem({
      key: key,
      value: JSON.stringify(value),
    });
  };

  useEffect(() => {
    Storage.getItem({key}).then(_data => _setData(_data));
  }, []);
  return [data, setData];
}
