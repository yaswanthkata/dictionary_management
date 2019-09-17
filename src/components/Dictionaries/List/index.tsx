import React from "react";
import { Dictionary } from "../../../types";
import "./DictionariesList.scss";

export interface IDictionariesListProps {
  dictionaries: Dictionary[];
  selectedDictionary: Dictionary | null;
  onSelect(dictionary: Dictionary): void;
  onDelete(id: string): void;
}
export const DictionariesList = ({ dictionaries, onSelect, selectedDictionary, onDelete }: IDictionariesListProps) => {
  const onDictionarySelectionChanged = (dictionary: Dictionary) => {
    onSelect(dictionary);
  };

  const onDeleteClick = (event: any, id: string) => {
    event.stopPropagation();
    onDelete(id);
  }
  return (
    <ul className="dictionaries-list">
      {dictionaries.map((dict: Dictionary) => (
        <li
          key={dict.id.toString()}
          onClick={() => onDictionarySelectionChanged(dict)}
          className={selectedDictionary && dict.id === selectedDictionary.id ? "selected" : ""}
        >
          <div>
            <h3 className="title"> {dict.name} 
            <span>
              <button
                type="button"
                onClick={(event) => onDeleteClick(event, dict.id)}
                className="btn btn-red"
              >
                <i className="fa fa-trash" aria-hidden="true" />
              </button>
            </span>
            </h3>

          </div>
        </li>
      ))}
    </ul>
  );
};

export default DictionariesList;
