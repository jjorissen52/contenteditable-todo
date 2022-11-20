import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import React, { ReactElement, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { StitchesProps } from '../@types/react';
import { deleteTask, getTasks, setTask, TodoType } from '../api';
import usePartialState from '../hooks/usePartialState';
import { styled } from '../stitches';
import { Todo, TodoFrame } from './Todo';

export type TodoListProps = StitchesProps<false>;
export function TodoList({ className, ...props }: TodoListProps): ReactElement {
  const [{ todos, ts }, updateState] = usePartialState({
    todos: [] as TodoType[],
    ts: new Date(),
  });
  const render = () => updateState({ ts: new Date() });

  useEffect(() => {
    getTasks().then(tasks => updateState({ todos: tasks }));
  }, [ts]);

  return (
    <Section className={className} {...props}>
      <div className="heading">
        <h1>My Todos ({todos.length})</h1>
        <div>
          <IconButton
            color="primary"
            size="large"
            className="add"
            onClick={() => {
              setTask(uuidv4(), {
                title: 'New Todo',
                description: 'No Description Yet',
                editing: true,
              });
              render();
            }}>
            <AddIcon />
          </IconButton>
        </div>
      </div>
      <TodoFrame className="frame">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            {...todo}
            onEdit={todo => {
              setTask(todo.id, {
                ...todo,
                editing: true,
              });
              render();
            }}
            onSave={todo => {
              setTask(todo.id, {
                ...todo,
                editing: false,
              });
              render();
            }}
            onDelete={() => {
              deleteTask(todo.id);
              render();
            }}
            onDone={todo => {
              setTask(todo.id, {
                ...todo,
                done: true,
              });
              render();
            }}
          />
        ))}
      </TodoFrame>
    </Section>
  );
}

const Section = styled('section', {
  '.heading': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  '.frame': {},
});
export default TodoList;
