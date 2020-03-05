import Store from '.';
import { observable, action, computed } from 'mobx';
import Todo from '../interfaces/Todo';

export default class Todolist {
  private url = '/todos'

  @observable.shallow Todos: Todo[] = [];
  constructor(private store: Store) {
    this.store;
  }


  fetchTodos = async (): Promise<void> => {
    if (this.Todos.length === 0) {
      const data = await this.store.api.fetch({ url: this.url, auth: false }, 200);
      this.Todos = data;
    }
  }
}
