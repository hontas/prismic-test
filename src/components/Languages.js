import React, { useContext } from 'react';
import PrismicContext from '../context/PrismicContext';
import DropDown from './DropDown';

const flags = {
  'en-us': '🇺🇸',
  'sv-se': '🇸🇪',
  no: '🇳🇴'
};

function Languages({ className = '' }) {
  const { languages, locale, setLocale } = useContext(PrismicContext);
  const otherLanguages = languages
    .filter((lang) => lang !== locale)
    .map((loc) => ({ id: loc, label: flags[loc] }));

  return (
    <div className={`Languages ${className}`}>
      <DropDown
        list={otherLanguages}
        selected={flags[locale]}
        onSelect={setLocale}
      />
    </div>
  );
}

export default Languages;
