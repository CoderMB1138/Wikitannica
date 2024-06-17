// App.js
import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Auth from './components/Auth';
import NewArticleModal from './components/NewArticleModal';
import Article from './components/Article';
import Sidebar from './components/Sidebar';
import Modal from 'react-modal';
import { signOut } from "firebase/auth";
import './index.css'; // Ensure this is imported

const App = () => {
  const [user, loading, error] = useAuthState(auth); // Use react-firebase-hooks to manage auth state
  const [articleId, setArticleId] = useState(null);
  const [authModalIsOpen, setAuthModalIsOpen] = useState(!user);
  const [newArticleModalIsOpen, setNewArticleModalIsOpen] = useState(false);

  useEffect(() => {
    if (loading) {
      // You can display a loading screen while the auth state is being determined
      return;
    }
    if (user) {
      setAuthModalIsOpen(false);
    } else {
      setAuthModalIsOpen(true);
    }
  }, [user, loading]);

  const openNewArticleModal = () => {
    setNewArticleModalIsOpen(true);
  };

  const closeNewArticleModal = () => {
    setNewArticleModalIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading screen while auth state is being determined
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Show an error screen if there was an error with auth
  }

  return (
    <div>
      {!user ? (
        <Auth 
          modalIsOpen={authModalIsOpen} 
          closeModal={() => setAuthModalIsOpen(false)} 
        />
      ) : (
        <>
          <header>
            <button onClick={openNewArticleModal}>New Article</button>
            <button onClick={handleLogout}>Logout</button>
          </header>
          <div style={{ display: 'flex', height: 'calc(100vh - 50px)' }}>
            <Sidebar setArticleId={setArticleId} />
            <div className="main-content">
              {articleId ? <Article articleId={articleId} /> : <p>Select an article to read</p>}
            </div>
          </div>
          <NewArticleModal
            modalIsOpen={newArticleModalIsOpen}
            closeModal={closeNewArticleModal}
          />
        </>
      )}
    </div>
  );
};

export default App;
