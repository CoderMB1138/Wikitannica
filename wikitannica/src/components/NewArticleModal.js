// NewArticleModal.js
import React, { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { db } from '../firebase'; // Adjust the import path as necessary
import Modal from 'react-modal';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; // Adjust the import path as necessary

const NewArticleModal = ({ modalIsOpen, closeModal }) => {
  const [user] = useAuthState(auth); // Get the authenticated user
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be signed in to post an article.");
      return;
    }
    try {
      await addDoc(collection(db, 'articles'), {
        title,
        date,
        content,
        userId: user.uid, // Optionally add userId to the article
      });
      setTitle('');
      setDate(new Date().toISOString().split('T')[0]);
      setContent('');
      alert("Article posted successfully!");
      closeModal();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to post article");
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="New Article"
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        ></textarea>
        <button type="submit">Post Article</button>
      </form>
    </Modal>
  );
};

export default NewArticleModal;
