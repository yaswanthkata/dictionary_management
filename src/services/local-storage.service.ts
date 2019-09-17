import { Dictionary } from "./../types/dictionary";

 const KEY = "LIBRARY";
export const createDictionary = (dict: Dictionary) => {
  const existingDictionaries = getItemsFromLocalStorage(KEY);
  existingDictionaries.push(dict);
};

export const updateDictionary = (dictionary: Dictionary) => {
  const existingDictionaries = getItemsFromLocalStorage(KEY);
  const dict = existingDictionaries.find(
    (d: Dictionary) => d.id === dictionary.id
  );
  dict.rows = dictionary.rows;
  existingDictionaries.push(dict);
};

const getItemsFromLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  return item != null ? JSON.parse(item) : null;
};

const clear = () => {
  localStorage.clear();
};

export const saveToLocalStorage = (data: any) => {
  clear();
  return localStorage.setItem(KEY, JSON.stringify(data));
};
