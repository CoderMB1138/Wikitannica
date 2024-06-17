// Auth.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'; // Adjust the import path as necessary
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

const Auth = ({ modalIsOpen, closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      closeModal();
    } catch (error) {
      console.error("Error signing in with password and email", error);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Sign In"
    >
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Sign In</button>
      </form>
    </Modal>
  );
};

export default Auth;
