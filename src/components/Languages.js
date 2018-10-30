import React, { useState } from 'react';
import './Languages.css';

const flags = {
  'en-us': '🇺🇸',
  'sv-se': '🇸🇪',
  'no': '🇳🇴'
};

function Languages({ languages, selectedLanguage, selectLanguage }) {
  const otherLanguages = languages.filter((lang) => lang !== selectedLanguage);
  const [open, setOpen] = useState(false);

  return (
    <div className="Languages">
      <div className="Languages__selected">{flags[selectedLanguage]}</div>
      <button
        className="Languages__toggle-btn"
        onClick={() => setOpen(!open)}
      >▼</button>
      <div className={`Languages__dropdown ${open && 'Languages__dropdown--is-open'}`}>
        {otherLanguages.map((lang) =>
          <button
            key={lang}
            className="Languages__dropdown-btn"
            onClick={() => {
              selectLanguage(lang);
              setOpen(false);
            }}
          >
            {flags[lang]}
          </button>
        )}
      </div>
    </div>
  );
}

export default Languages;
