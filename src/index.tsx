import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './components/Layout';
import TodoList from './components/TodoList';
import { css, globalStyles } from './stitches';

const appStyles = css({
  '.content': {
    padding: '$4',
  },
})();

function App() {
  globalStyles();
  return (
    <Layout>
      <div className={appStyles}>
        <article className="content">
          <TodoList />
        </article>
      </div>
    </Layout>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
