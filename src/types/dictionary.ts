import { DictionaryRow } from "./dictionary-row";
export interface Dictionary {
  id: string;
  name: string;
  rows: DictionaryRow[];
}
