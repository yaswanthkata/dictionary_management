import React from 'react';
import uuid from 'uuid';

import Header from "./components/shared/Header";
import Dictionaries from './components/Dictionaries';
import { Dictionary } from './types';
import './App.scss';


interface IProps {

}
export interface IAppState {
  dictionaries: Dictionary[];
  selectedDictionary: any;
}

class App extends React.Component<IProps, IAppState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedDictionary: null,
      dictionaries: []
    };
  }

  selectDictionary = (dictionary: Dictionary) => {
    this.setState({ selectedDictionary: dictionary});
  };

  addDictionary = (name: string) => {
    const newDict: Dictionary = { id: uuid.v4(), name: name, rows: [] };
    this.setState({ dictionaries: [...this.state.dictionaries, newDict] })
  }

  deleteDictionary = (id: string) => {
    this.setState({
      dictionaries: [...this.state.dictionaries.filter((s: any) => id !== s.id)], selectedDictionary: null
    });
  }

  render() {
    const { dictionaries, selectedDictionary } = this.state;
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

          </div>
        </div>
      </div>
    );
  }
}

export default App;
