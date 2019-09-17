import { Dictionary } from "./../types/dictionary";

const KEY = "LIBRARY";
export const createDictionary = (dict: Dictionary) => {
  const existingDictionaries = getItemsFromLocalStorage();
  existingDictionaries.push(dict);
};

export const getItemsFromLocalStorage = () => {
  const item = localStorage.getItem(KEY);
  return item != null ? JSON.parse(item) : null;
};

const clear = () => {
  localStorage.clear();
};

export const saveToLocalStorage = (data: any) => {
  clear();
  return localStorage.setItem(KEY, JSON.stringify(data));
};
