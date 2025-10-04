import React, { useEffect } from 'react';
import socket from './socket';

const App = () => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected', socket.id);
    });

    return () => {
      socket.off('connect');
    };
  }, []);

  return (
    <div>
      <h1>My Name is Emam Saimon</h1>
    </div>
  );
};

export default App;
