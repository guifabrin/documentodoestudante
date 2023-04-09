import {useEffect, useState} from 'react';
import * as FileSystem from 'expo-file-system';

export function useStorage(key) {
  const [data, _setData] = useState(null);
  const fileUri = `${FileSystem.cacheDirectory}${key}.json`;
  const setData = value => {
    _setData(value);
    FileSystem.writeAsStringAsync(fileUri, JSON.stringify(value));
  };
  const deleteData = () => {
    _setData(null);
    FileSystem.deleteAsync(fileUri);
  };

  useEffect(() => {
    const readFile = async () => {
      const file = await FileSystem.getInfoAsync(fileUri);
      if (file.exists) {
        const _data = await FileSystem.readAsStringAsync(fileUri);
        if (_data) _setData(JSON.parse(_data));
      }
    };
    readFile();
  }, []);
  return [data, setData, deleteData];
}
