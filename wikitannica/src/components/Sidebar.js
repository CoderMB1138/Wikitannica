// Sidebar.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase'; // Adjust the import path as necessary

const Sidebar = ({ setArticleId }) => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      const querySnapshot = await getDocs(collection(db, 'articles'));
      const articlesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setArticles(articlesData);
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article => 
    article.title?.toLowerCase().includes(search.toLowerCase()) // Use optional chaining and check if article.title exists
  );

  return (
    <div>
      <h2>Articles</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search articles"
      />
      <ul>
        {filteredArticles.map(article => (
          <li key={article.id}>
            <button onClick={() => setArticleId(article.id)}>
              {article.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
