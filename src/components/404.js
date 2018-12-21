import React from 'react';

export default ({ match }) => (
  <div>
    <h1>404 - Not Found</h1>
    <p>
      <small>
        <code>{match.url}</code>
      </small>
    </p>
    <a href="/">Go to start page</a>
  </div>
);
