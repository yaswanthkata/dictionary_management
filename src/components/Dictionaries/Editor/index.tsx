import React from 'react'
import { DictionaryRow } from '../../../types';
import "./Editor.scss";
import Badge from '../../shared/Badge';

interface Props {
    dictionaryRows: DictionaryRow[];
    onSave(rows: DictionaryRow[]): void;
    onAdd(): void;
    onDelete(rowId: string): void;
    onValidate(rows: DictionaryRow[]): void;
}

export const Editor = ({ dictionaryRows, onSave, onAdd, onDelete, onValidate }: Props) => {

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

    const handleValidation = () => {
        onValidate(dictionaryRows);
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

                    <span>{row.errors.length > 0 && row.errors.map(error => <Badge errorType={error} />)}
                    </span>
                </div>

            ))}
            <div className="editor-actions">
                {dictionaryRows.length > 0 && <>
                    <button onClick={handleValidation} className="btn btn-green">
                        <i className="fa fa-exclamation-circle" aria-hidden="true" /> Validate
                    </button>
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
