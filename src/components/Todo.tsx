import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { IconButton } from '@mui/material';
import clsx from 'clsx';
import { ReactElement, useRef } from 'react';
import { StitchesProps } from '../@types/react';
import { TodoType } from '../api';
import usePartialState from '../hooks/usePartialState';
import { styled } from '../stitches';
import Card from './Card';

export type TodoProps = StitchesProps &
  TodoType & {
    onEdit?: (todo: TodoType) => void;
    onSave?: (todo: TodoType) => void;
    onDelete?: (todo: TodoType) => void;
    onDone?: (todo: TodoType) => void;
  };

export const Todo = styled(
  ({
    id,
    title: initialTitle,
    description: initialDescription,
    editing = false,
    done = false,
    onEdit = () => console.debug('editing...'),
    onSave = () => console.debug('saving...'),
    onDelete = () => console.debug('deleting...'),
    onDone = () => console.debug('done!'),
    ...props
  }: TodoProps): ReactElement => {
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const descriptionRef = useRef<HTMLParagraphElement | null>(null);
    const [{ title, description }, updateState] = usePartialState({
      title: initialTitle,
      description: initialDescription,
    });

    const todo: TodoType = { id, title, description, done };

    return (
      <TodoContainer as="li">
        <Card {...props}>
          <div className="top-content">
            <div className="main-content">
              <h3 contentEditable={editing} suppressContentEditableWarning ref={titleRef}>
                {title}
              </h3>
              <p contentEditable={editing} suppressContentEditableWarning ref={descriptionRef}>
                {description}
              </p>
            </div>
            <div className={clsx(editing || 'hidden')}>
              <IconButton
                size="small"
                color="primary"
                onClick={() => {
                  if (!titleRef.current || !descriptionRef.current) return;
                  const title = titleRef.current.innerText;
                  const description = descriptionRef.current.innerText;
                  updateState({ title, description });
                  onSave({ ...todo, title, description });
                }}>
                <SaveIcon />
              </IconButton>
            </div>
            <div className={clsx(editing && 'hidden')}>
              <IconButton size="small" color="inherit" onClick={() => onEdit(todo)}>
                <EditIcon />
              </IconButton>
            </div>
          </div>
          <div className="buttons">
            <IconButton size="small" color="error" onClick={() => onDelete(todo)}>
              <DeleteIcon />
            </IconButton>
            <IconButton size="small" color="success" onClick={() => onDone(todo)}>
              <CheckIcon />
            </IconButton>
          </div>
        </Card>
      </TodoContainer>
    );
  },
  {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    h3: {
      padding: '0 $1 $1 $2',
      whiteSpace: 'pre-wrap',
    },
    p: {
      padding: '$1 0 $1 $2',
      lineHeight: '1.3rem',
      flex: '1 1 100%',
      whiteSpace: 'pre-wrap',
    },
    '.heading': {
      display: 'flex',
      justifyContent: 'space-between',
    },
    '.top-content': {
      display: 'flex',
      flexDirection: 'row',
      flex: '1 1 100%',
    },
    '.main-content': {
      flex: '1 1 100%',
      display: 'flex',
      flexDirection: 'column',
    },
    '.buttons': {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
    },
  }
);

export const TodoContainer = styled('div', {
  flex: '1 1 20rem',
  marginBottom: '$4',
  display: 'flex',
  justifyContent: 'center',
});

export const TodoFrame = styled(
  ({ children, ...props }: StitchesProps): ReactElement => (
    <ul {...props}>
      {children}
      {Array(20)
        .fill(0)
        .map((_, idx) => (
          <TodoContainer key={idx} css={{ height: '0', padding: '0', margin: '0' }} aria-hidden />
        ))}
    </ul>
  ),
  {
    display: 'flex',
    flexFlow: 'row wrap',
    columnGap: '$4',
    justifyContent: 'space-between',
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  }
);

export default Todo;
