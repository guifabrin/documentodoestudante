import * as FileSystem from 'expo-file-system';
import {useEffect, useState} from "react";

export function useStorage(storeKey = '@storage_Key') {
    const [data, _setData] = useState(null)
    const key = `${FileSystem.documentDirectory}_${storeKey}`

    const setData = (value) => {
        FileSystem.writeAsStringAsync(key, value)
        _setData(value)
    }

    useEffect(() => {
        FileSystem.readAsStringAsync(key).then(_setData)
    }, [])
    return [data, setData]
}