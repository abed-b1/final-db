import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const styles = {
    container: {
      maxWidth: '400px',
      margin: '50px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      fontSize: '24px',
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    link: {
      display: 'block',
      marginTop: '20px',
      color: '#007bff',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Reset Password</h1>
      <form>
        <input type="email" placeholder="Email" style={styles.input} required />
        <button style={styles.button}>Send Reset Link</button>
      </form>
      {/* Back to Login Link */}
      <Link to="/login" style={styles.link}>
        Back to Login
      </Link>
    </div>
  );
};

export default ForgotPassword;
