// Article.js
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase'; // Adjust the import path as necessary

const Article = ({ articleId }) => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const docRef = doc(db, 'articles', articleId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setArticle(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchArticle();
  }, [articleId]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.date}</p>
      <div>{article.content}</div>
    </div>
  );
};

export default Article;
