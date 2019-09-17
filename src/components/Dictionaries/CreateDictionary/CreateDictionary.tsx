import React, { useState } from 'react';
import "./CreateDictionary.scss";

interface ICreateDictionaryProps {
    onAddClick(name: string): void;
}

const CreateDictionary: React.FunctionComponent<ICreateDictionaryProps> = ({ onAddClick }: ICreateDictionaryProps) => {
    const [dictionaryName, setDictionaryName] = useState("");
    const [formValid, setformValid] = useState(false);

    const handleClick = () => {
        if (!dictionaryName.trim().length)
            return
        onAddClick(dictionaryName);
        setDictionaryName('');
    };

    const handleInputChange = (value: string) => {
        setDictionaryName(value);
        setformValid(value.trim().length !== 0);
    }

    return (
        <div className="create-form">
            <input className="create-input"
                type="text"
                placeholder="Enter dictionary name"
                value={dictionaryName}
                onChange={({
                    target: { value }
                }: React.ChangeEvent<HTMLInputElement>) => handleInputChange(value)}
            />
            <button className="create-button btn btn-green" disabled={!formValid} onClick={handleClick}>
                Create Dictionary
        </button>
        </div>
    );
};

export default CreateDictionary;
