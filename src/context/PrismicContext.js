import React from 'react';
import api from '../api';

const PrismicContext = React.createContext({});
const pathToUID = {
  '/': 'home',
  '/contact/': 'contact',
  '/about/': 'about'
};
const toUID = (path) => {
  if (typeof pathToUID[path] === 'undefined')
    throw Error(`Unhandled path '${path}'`);
  return pathToUID[path];
};

export class PrismicProvider extends React.Component {
  state = {
    languages: [],
    locale: 'sv-se',
    document: {},
    isLoading: false
  };

  setLocale = (locale) => {
    this.setState({ locale });
    this.fetchPageByUID(this.state.document.uid, locale);
  };

  fetchPageForPath = (path) =>
    this.fetchPageByUID(toUID(path), this.state.locale);

  fetchPageByUID = (pageUID, locale = this.state.locale) => {
    this.setState({ isLoading: true });
    return api.getPageByUID(pageUID, locale).then((doc) => {
      this.setState({
        isLoading: false,
        languages: [
          doc.lang,
          ...doc.alternate_languages.map(({ lang }) => lang)
        ],
        locale: doc.lang,
        document: {
          ...doc.data,
          uid: doc.uid
        }
      });
    });
  };

  render() {
    return (
      <PrismicContext.Provider
        value={{
          ...this.state,
          fetchPageForPath: this.fetchPageForPath,
          setLocale: this.setLocale
        }}
      >
        {this.props.children}
      </PrismicContext.Provider>
    );
  }
}

export default PrismicContext;
