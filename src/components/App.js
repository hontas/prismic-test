import React, { useState, useEffect } from 'react';
import Languages from './Languages';
import api from '../api';
import './App.css';

const pageUIDs = ['home', 'about', 'contact'];

const App = () => {
  const [languages, setLanguages] = useState([]);
  const [locale, setLocale] = useState();
  const [doc, setDoc] = useState({});
  const [pageUID] = useState(pageUIDs[0]);

  useEffect(() => {
    api.getPageByUID(pageUID).then((doc) => {
      setLanguages([
        doc.lang,
        ...doc.alternate_languages.map(({ lang }) => lang)
      ]);
      setLocale(doc.lang);
      setDoc(doc.data);
    });
  }, []);

  function changeLocale(locale) {
    setLocale(locale);
    api.getPageByUID(pageUID, locale).then((doc) => setDoc(doc.data));
  }

  const { meta_title, meta_description, slug } = doc;

  return (
    <div className="App">
      <header className="App-header">
        <Languages
          languages={languages}
          selectedLanguage={locale}
          selectLanguage={changeLocale}
        />
      </header>
      <main className="App-content">
        {document && (
          <>
            <h1>{meta_title}</h1>
            <p>{`${locale}/${slug}`}</p>
            <p>{meta_description}</p>
            {document.image && (
              <img
                src={document.image.url}
                alt={document.image.alt}
                style={{ maxWidth: '35vw' }}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;
