const PREFIX = 'tasks-';

export async function getTasks(): Promise<TodoType[]> {
  return Object.keys(window.localStorage)
    .filter(k => k.startsWith(PREFIX))
    .map(key => JSON.parse(window.localStorage.getItem(key)!)) as TodoType[];
}

export async function setTask(id: string, todo: Omit<TodoType, 'id'>): Promise<void> {
  window.localStorage.setItem(`${PREFIX}${id}`, JSON.stringify({ ...todo, id }));
}

export async function deleteTask(id: string): Promise<void> {
  window.localStorage.removeItem(`${PREFIX}${id}`);
}

export type TodoType = {
  id: string;
  title: string;
  description?: string;
  done?: boolean;
  editing?: boolean;
};
