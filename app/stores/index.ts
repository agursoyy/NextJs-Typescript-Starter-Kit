import Language from './language';
import { Stringify } from '../utils';
import Api from './api';
import Todolist from './todolist';

declare global {
  interface Window {
    store: Store;
  }
}

export default class Store {
  public api = new Api(this);

  public language = new Language(this);
  public todolist = new Todolist(this);

  [name: string]: any;

  export = (): string => JSON.stringify(Stringify(this));


  import = (data: string) =>
    Object.entries(JSON.parse(data)).forEach(([storeName, store]) =>
      Object.entries(store).forEach(([variableName, value]) => {
        this[storeName][variableName] = value;
      })
    );
} 