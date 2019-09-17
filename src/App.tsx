import * as React from "react";
import uuid from "uuid";
import { DictionaryRow, Dictionary } from "./types";
import Header from "./components/shared/Header";
import Dictionaries from "./components/Dictionaries";
import { saveToLocalStorage } from './services';
import { Editor } from "./components/Dictionaries/Editor";
import "./App.scss";

interface IProps {

}
export interface IAppState {
    dictionaries: Dictionary[];
    selectedDictionary: any;
    dictionaryRows: DictionaryRow[];
}

class App extends React.Component<IProps, IAppState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            selectedDictionary: null,
            dictionaries: [],
            dictionaryRows: []
        };
    }

    selectDictionary = (dictionary: Dictionary) => {
        this.setState({ selectedDictionary: dictionary, dictionaryRows: [...dictionary.rows] });
    };

    addDictionary = (name: string) => {
        const newDict: Dictionary = { id: uuid.v4(), name: name, rows: [] };
        this.setState({ dictionaries: [...this.state.dictionaries, newDict] })
    }

    deleteDictionary = (id: string) => {
        this.setState({
            dictionaries: [...this.state.dictionaries.filter((s: any) => id !== s.id)], selectedDictionary: null
        }, () => this.save());
    }

    handleAddRow = () => {
        const dict = this.state.selectedDictionary;
        const dictionaryRow = { id: uuid.v4(), domain: "", range: "", errors: "" }
        const updatedRows = [...dict.rows, dictionaryRow];
        this.handleSave(updatedRows);
    }

    handleRemoveRow = (id: string) => {
        const dict = this.state.selectedDictionary;
        const updatedRows = [...dict.rows.filter((s: any) => id !== s.id)];
        this.handleSave(updatedRows);
    }

    handleSave = (rows: DictionaryRow[]) => {
        const newItems = [...this.state.dictionaries];
        const selectedItem = newItems.find(d => d.id === this.state.selectedDictionary.id);
        if (selectedItem) {
            selectedItem.rows = [...rows];
            this.setState({ dictionaries: newItems, dictionaryRows: [...rows] }, () => this.save());
        }
    }

    save = () => {
        saveToLocalStorage(this.state.dictionaries)
    }

    render() {
        const { dictionaries, selectedDictionary, dictionaryRows } = this.state;
        return (
            <div>
                <Header />
                <div className="dictionaries-container">
                    <div className="list">
                        <Dictionaries
                            dictionaries={dictionaries}
                            selectedDictionary={selectedDictionary}
                            onCreate={this.addDictionary}
                            onSelect={this.selectDictionary}
                            onDelete={this.deleteDictionary}
                        />
                    </div>
                    <div className="editor">
                        {selectedDictionary && (
                            <Editor dictionaryRows={dictionaryRows}
                                onAdd={this.handleAddRow}
                                onSave={this.handleSave}
                                onDelete={this.handleRemoveRow}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default App;

