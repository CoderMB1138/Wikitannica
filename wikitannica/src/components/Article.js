import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
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
        console.log('No such document!');
      }
    };

    fetchArticle();
  }, [articleId]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const renderContent = (content) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.date}</p>
      {article.imageUrl && (
        <img src={article.imageUrl} alt="Article" style={{ maxWidth: '100%' }} />
      )}
      {renderContent(article.content)}
    </div>
  );
};

export default Article;



