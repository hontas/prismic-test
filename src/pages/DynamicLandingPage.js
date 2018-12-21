import React, { useContext, useEffect } from 'react';

import NotFound from '../components/404';
import PrismicContext from '../context/PrismicContext';
import './DynamicLandingPage.css';

export default ({ match }) => {
  const { document, locale, fetchPageBySlug, isLoading, status } = useContext(
    PrismicContext
  );

  useEffect(() => {
    fetchPageBySlug(match.params.slug);
  }, []);

  if (isLoading) {
    return (
      <p>{locale === 'sv-se' ? 'Laddar innehåll...' : 'Loading content...'}</p>
    );
  }

  if (status === 404) return <NotFound match={match} />;

  const { slug, content = [], ...rest } = document || {};
  const metaInfo = Object.entries(rest).filter(([key]) => key.includes('meta'));

  return (
    <div className="DynamicLandingPage">
      {content.map((section) => (
        <section key={section.id}>
          <h2>{section.title.map(({ text }) => text)}</h2>
          <p>{section.text.map(({ text }) => text)}</p>
          <img
            src={section.image.url}
            alt={section.image.alt}
            className="DynamicLandingPage__image"
          />
        </section>
      ))}
      <div className="DynamicLandingPage__meta">
        <dl>
          {metaInfo.map(([term, definition]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{definition}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
