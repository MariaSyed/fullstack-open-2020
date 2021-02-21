import React from 'react';

const commonStyles = {
  container: {
    border: '1px solid',
    padding: '0 20px',
    borderRadius: 10,
    margin: '25px 10px',
    backgroundColor: '#f0f0f0',
  },
  text: {},
};

const styles = {
  container: {
    success: {
      ...commonStyles.container,
      borderColor: 'green',
    },
    error: {
      ...commonStyles.container,
      borderColor: 'red',
    },
  },
  text: {
    success: {
      ...commonStyles.text,
      color: 'green',
    },
    error: {
      ...commonStyles.text,
      color: 'red',
    },
  },
};

const Notification = ({ variant = 'success', message }) => (message ? (
  <div style={styles.container[variant]}>
    <h2 style={styles.text[variant]}>{message}</h2>
  </div>
) : null);

export default Notification;
