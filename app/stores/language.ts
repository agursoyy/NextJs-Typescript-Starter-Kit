import Store from '.';
import { observable, action, computed, toJS, decorate } from 'mobx';
import tr from '../static/locales/tr/tr.json';
import en from '../static/locales/en/en.json';

class Language {
  store = null;
  constructor(store: Store) {
    this.store = store;
  }
  @observable.shallow langArray = [tr, en];
  index = 0;
  @observable
  language = '';

  @action
  changeLang = (langParam: string): void => {
    this.langArray.forEach((lang, index) => {
      if (lang.lang === langParam) {
        this.index = index;
        this.language = lang.lang;
        return;
      }
    });
  }

  t = (jsonParam: string): object => toJS(this.langArray[this.index][jsonParam]);

}
export default Language;