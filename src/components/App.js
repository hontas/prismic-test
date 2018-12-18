import React, { Component } from 'react';
import Languages from './Languages';
import api from '../api';
import './App.css';

const pages = ['home', 'about', 'contact'];

class App extends Component {
  state = {
    languages: [],
    document: {},
    currentPage: pages[0]
  };

  componentDidMount() {
    api.getLanguages().then((languages) => {
      this.setState({ languages });
      this.setLanguage(languages[0]);
    });
    this.fetchPage(this.state.currentPage);
  }

  setLanguage = (nextLanguage) => {
    const { selectedLanguage } = this.state;
    if (nextLanguage === selectedLanguage) return;

    this.fetchPage(this.state.currentPage, nextLanguage);
    this.setState({ selectedLanguage: nextLanguage });
  };

  fetchPage = (uid, locale) => {
    api.getPageByUID(uid, locale).then((document) => {
      this.setState({ document: document.data });
    });
  };

  render() {
    const { languages, selectedLanguage, document } = this.state;
    const { meta_title, meta_description, slug } = document;

    return (
      <div className="App">
        <header className="App-header">
          <Languages
            languages={languages}
            selectedLanguage={selectedLanguage}
            selectLanguage={this.setLanguage}
          />
        </header>
        <main className="App-content">
          {document && (
            <>
              <h1>{meta_title}</h1>
              <p>{`${selectedLanguage}/${slug}`}</p>
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
  }
}

export default App;
