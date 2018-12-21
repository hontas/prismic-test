import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PrismicContext from '../context/PrismicContext';

export default ({ match }) => {
  const { document, locale, fetchPageForPath, isLoading } = useContext(
    PrismicContext
  );

  useEffect(() => {
    fetchPageForPath(match.path);
  }, []);

  if (isLoading)
    return (
      <p>{locale === 'sv-se' ? 'Laddar innehåll...' : 'Loading content...'}</p>
    );

  const { meta_title, meta_description, slug } = document || {};

  return (
    <main className="App-content">
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
        <h3>Dynamiska sidor</h3>
        Publicerad:
        <Link to="kampanj/loans-with-market-leading-interest">
          kampanj/loans-with-market-leading-interest
        </Link>
        <br />
        EJ publicerad:
        <Link to="kampanj/lan-med-marknadsledande-ranta">
          kampanj/lan-med-marknadsledande-ranta
        </Link>
      </>
    </main>
  );
};
