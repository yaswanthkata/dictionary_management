import React from 'react'
import { DictionaryRow } from '../../../types';
import "./Editor.scss";

interface Props {
    dictionaryRows: DictionaryRow[];
    onSave(rows: DictionaryRow[]): void;
    onAdd(): void;
    onDelete(rowId: string): void;
}

export const Editor = ({ dictionaryRows, onSave, onAdd, onDelete }: Props) => {

    const handleInputChange = (id: string, type: string) => (evt: { target: { value: any; }; }) => {
        const updatedRows = dictionaryRows.map((row) => {
            if (id !== row.id) return row;
            return { ...row, [type]: evt.target.value };
        });
        onSave(updatedRows);
    };

    const handleSubmit = () => {
        onSave(dictionaryRows);
    };
    return (
        <div>
            {dictionaryRows.map((row) => (
                <div className="row" key={row.id}>
                    <input
                        type="text" className="editor-input"
                        placeholder="Domain"
                        value={row.domain}
                        onChange={handleInputChange(row.id, "domain")}
                    />
                    <input
                        type="text" className="editor-input"
                        placeholder="Range"
                        value={row.range}
                        onChange={handleInputChange(row.id, "range")}
                    />
                    <button
                        type="button"
                        onClick={() => onDelete(row.id)}
                        className="btn btn-red"
                    >
                        <i className="fa fa-minus" aria-hidden="true" />
                    </button>
                </div>

            ))}
            <div className="editor-actions">
                {dictionaryRows.length > 0 && <>
                    <button onClick={handleSubmit} className="btn btn-green">
                        <i className="fa fa-file" aria-hidden="true" /> Save
                    </button>
                </>}
                <button
                    type="button"
                    onClick={onAdd}
                    className="btn btn-green"
                >
                    <i className="fa fa-plus" aria-hidden="true" /> Add Row
            </button>
            </div>
        </div>
    )
}
