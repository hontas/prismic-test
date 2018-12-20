import React, { useState, useContext } from 'react';
import PrismicContext from '../context/PrismicContext';
import './Languages.css';

const flags = {
  'en-us': '🇺🇸',
  'sv-se': '🇸🇪',
  no: '🇳🇴'
};

function Languages() {
  const [open, setOpen] = useState(false);
  const { languages, locale, setLocale } = useContext(PrismicContext);
  const otherLanguages = languages.filter((lang) => lang !== locale);

  return (
    <div className="Languages">
      <div className="Languages__selected">{flags[locale]}</div>
      <button className="Languages__toggle-btn" onClick={() => setOpen(!open)}>
        ▼
      </button>
      <div
        className={`Languages__dropdown ${open &&
          'Languages__dropdown--is-open'}`}
      >
        {otherLanguages.map((lang) => (
          <button
            key={lang}
            className="Languages__dropdown-btn"
            onClick={() => {
              setLocale(lang);
              setOpen(false);
            }}
          >
            {flags[lang]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Languages;
