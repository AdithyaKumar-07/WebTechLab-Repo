import React, { useState } from 'react';

const CounterApp = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>React Counter</h1>
      <h2 style={styles.greeting}>Hello Adithya</h2>
      <div style={styles.countDisplay}>{count}</div>
      <div style={styles.buttonGroup}>
        <button onClick={decrement} style={styles.button}>Decrement</button>
        <button onClick={reset} style={styles.resetButton}>Reset</button>
        <button onClick={increment} style={styles.button}>Increment</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '50px auto',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#cecece',
  },
  greeting: {
    fontSize: '20px',
    marginBottom: '20px',
    color: '#cecece',
  },
  countDisplay: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#007bff',
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  },
  resetButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
  }
};

export default CounterApp;
