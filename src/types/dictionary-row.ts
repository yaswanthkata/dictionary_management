import { ERROR } from "./error.enum";

export interface DictionaryRow {
  id: string;
  domain: string;
  range: string;
  errors: ERROR[];
}
