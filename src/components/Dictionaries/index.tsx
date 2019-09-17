import React from "react";
import { Dictionary } from "../../types";
import DictionariesList from "./List";
import CreateDictionary from "./CreateDictionary/CreateDictionary";

interface IDictionariesProps {
  dictionaries: Dictionary[];
  onCreate(name: string): void;
  selectedDictionary: Dictionary;
  onSelect(dictionary: Dictionary): void;
  onDelete(id: string): void;
}
export const Dictionaries = ({
  dictionaries,
  onCreate,
  selectedDictionary,
  onSelect,
  onDelete
}: IDictionariesProps) => {
  const addDictionary = (name: string) => {
    if (
      dictionaries.find(d => d.name.toLowerCase() === name.toLowerCase())
    ) {
      window.alert("Dictionary already exists");
      return;
    }
    onCreate(name);
  };

  return (
    <div>
      <CreateDictionary onAddClick={addDictionary} />
      {dictionaries.length === 0 ? (
        "No Dictionaries"
      ) : (
          <DictionariesList
            dictionaries={dictionaries}
            selectedDictionary={selectedDictionary}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        )}
    </div>
  );
};

export default Dictionaries;
