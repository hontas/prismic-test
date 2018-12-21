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
    isLoading: false,
    status: 200,
    refs: [],
    currentRef: undefined
  };

  componentDidMount() {
    api.getApiInfo().then((apiInfo) => {
      console.log('apiInfo', apiInfo);
      this.setState({
        refs: apiInfo.refs,
        currentRef: apiInfo.refs.find(({ isMasterRef }) => isMasterRef).ref
      });
    });
    window.__getState = () => this.state;
  }

  setPrismicRef = (ref) => {
    this.setState({ currentRef: ref });
    api.setRef(ref);
    if ((this.state.document, this.state.document.id)) {
      this.fetchPageByUID(this.state.document.uid, this.state.locale);
    } else {
      api.reFetch().then(this.handleResponse);
    }
  };

  setLocale = (locale) => {
    this.setState({ locale });
    this.fetchPageByUID(this.state.document.uid, locale, this.state.currentRef);
  };

  fetchPageForPath = (path) =>
    this.fetchPageByUID(toUID(path), this.state.locale, this.state.currentRef);

  fetchPageBySlug = (slug, locale, ref = this.state.currentRef) => {
    this.setState({ isLoading: true });
    return api.getPageBySlug(slug, locale, ref).then(this.handleResponse);
  };

  fetchPageByUID = (
    pageUID,
    locale = this.state.locale,
    ref = this.state.currentRef
  ) => {
    this.setState({ isLoading: true });
    return api.getPageByUID(pageUID, locale, ref).then(this.handleResponse);
  };

  handleResponse = (doc) => {
    if (!doc) {
      this.setState({
        isLoading: false,
        document: {},
        status: 404
      });
    } else {
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
        },
        status: 200
      });
    }
  };

  render() {
    return (
      <PrismicContext.Provider
        value={{
          ...this.state,
          fetchPageForPath: this.fetchPageForPath,
          fetchPageBySlug: this.fetchPageBySlug,
          setPrismicRef: this.setPrismicRef,
          setLocale: this.setLocale
        }}
      >
        {this.props.children}
      </PrismicContext.Provider>
    );
  }
}

export default PrismicContext;
