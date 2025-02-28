import { useEffect, useState } from "react";

export function useLocalStorageState(key, intialState) {
  const [value, setValue] = useState(function() {
    const storedValue = localStorage.getItem(key);
    if(!storedValue) return intialState;
    return JSON.parse(storedValue);
  });

  useEffect(function() {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]); 

  return [value, setValue];
}