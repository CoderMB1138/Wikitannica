import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '../firebase'; // Adjust the import path as necessary
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Modal from 'react-modal';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; // Adjust the import path as necessary
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill stylesheet
import sanitizeHtml from 'sanitize-html';
import he from 'he';

const customStyles = {
  content: {
    width: '1000px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const NewArticleModal = ({ modalIsOpen, closeModal }) => {
  const [user] = useAuthState(auth); // Get the authenticated user
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be signed in to post an article.');
      return;
    }
    try {
      let imageUrl = '';
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const sanitizedContent = sanitizeHtml(content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          img: ['src', 'alt'],
        },
      });

      // Decode HTML entities
      const decodedContent = he.decode(sanitizedContent);

      await addDoc(collection(db, 'articles'), {
        title,
        date,
        content: decodedContent,
        imageUrl,
        userId: user.uid,
      });

      setTitle('');
      setDate(new Date().toISOString().split('T')[0]);
      setContent('');
      setImage(null);
      alert('Article posted successfully!');
      closeModal();
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Failed to post article');
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="New Article"
      style={customStyles}
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          style={{
            marginBottom: '15px',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={{
            marginBottom: '15px',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <ReactQuill
          value={content}
          onChange={setContent}
          placeholder="Content (plain text or HTML)"
          style={{
            marginBottom: '30px',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            height: '450px',
          }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{
            marginBottom: '30px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            color: '#fff',
            backgroundColor: '#007BFF',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          Post Article
        </button>
      </form>
    </Modal>
  );
};

export default NewArticleModal;
