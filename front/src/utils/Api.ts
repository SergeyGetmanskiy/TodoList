import { TodoTypes } from "../components/interfaces/TodoTypes";

class Api {

  private _url: string

  constructor(baseUrl: string) {
    this._url = baseUrl;
  }

  getTodos(): Promise<TodoTypes[]> {
    return fetch(`${this._url}/todos`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
  }

  postTodo(todo: TodoTypes): Promise<TodoTypes> {
    return fetch(`${this._url}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo)})
      .then((res) => {
        if(res.ok) {
          return res.json();
          } else {
            return Promise.reject(`Ошибка: ${res.status}`);
          }
      })
  }


  deleteTodo(todoId: number): Promise<TodoTypes> {
    return fetch(`${this._url}/todos/${todoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      })
      .then((res) => {
        if(res.ok) {
          return res.json();
          } else {
            return Promise.reject(`Ошибка: ${res.status}`);
          }
      })
  }

  updateTodo(todo: TodoTypes): Promise<TodoTypes>  {
    return fetch(`${this._url}/todos/${todo._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: todo.name,
        description: todo.description,
        status: todo.status,
    })})
    .then((res) => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }
};

export const api = new Api('http://localhost:3001');

