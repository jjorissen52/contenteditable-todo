import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import React, { ReactElement } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { StitchesProps } from '../@types/react';
import usePartialState from '../hooks/usePartialState';
import { styled } from '../stitches';
import { Todo, TodoFrame, TodoType } from './Todo';

const shortDescription = 'cool';
const longDescription =
  'this is a long description which is intended to demonstrate what happens if the description causes the todo to be larger than the default size';
const description = () => (Math.random() > 0.5 ? longDescription : shortDescription);

export type TodoListProps = StitchesProps<false>;
export function TodoList({ className, ...props }: TodoListProps): ReactElement {
  const [{ todos }, , reduceState] = usePartialState({
    todos: Array(3)
      .fill(description())
      .map(description => ({
        id: uuidv4(),
        title: 'ok',
        description,
        editing: false,
      })) as TodoType[],
  });
  // @ts-ignore
  window.todos = todos;
  return (
    <Section className={className} {...props}>
      <div className="heading">
        <h1>My Todos ({todos.length})</h1>
        <div>
          <IconButton
            color="primary"
            size="large"
            className="add"
            onClick={() =>
              reduceState(({ todos }) => {
                todos.push({
                  id: uuidv4(),
                  title: 'ok',
                  description: description(),
                  editing: true,
                });
                return { todos };
              })
            }>
            <AddIcon />
          </IconButton>
        </div>
      </div>
      <TodoFrame className="frame">
        {todos.map((todo, idx) => (
          <Todo
            key={todo.id}
            {...todo}
            onEdit={() =>
              reduceState(({ todos }) => {
                todos[idx].editing = true;
                return { todos };
              })
            }
            onSave={todo =>
              reduceState(({ todos }) => {
                console.debug({ todo });
                todos.splice(idx, 1, { ...todo, editing: false });
                return { todos };
              })
            }
            onDelete={() =>
              reduceState(({ todos }) => {
                todos.splice(idx, 1);
                return { todos };
              })
            }
            onDone={() =>
              reduceState(({ todos }) => {
                todos.splice(idx, 1, { ...todo, done: true });
                return { todos };
              })
            }
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
