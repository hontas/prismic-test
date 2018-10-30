import React, { Component } from 'react';
import Languages from './Languages';
import api from '../api';
import './App.css';

const documentCache = {};

class App extends Component {
  state = {
    languages: [],
    document: null
  };

  componentDidMount() {
    api.getLanguages()
      .then((languages) =>{
        this.setState({ languages })
        this.setLanguage(languages[0]);
      });
    this.fetchPage('home');
  }

  setLanguage = (nextLanguage) => {
    const { selectedLanguage, document } = this.state;
    if (nextLanguage !== selectedLanguage) {
      const page = document && document.alternate_languages.find(({ lang }) => nextLanguage === lang);
      page && this.fetchPage(page.uid);
    }
    this.setState({ selectedLanguage: nextLanguage });
  };

  fetchPage = (uid) => {
    if (documentCache[uid]) {
      this.setState({ document: documentCache[uid] })
    } else {
      api.getPage(uid)
        .then((document) => {
          documentCache[document.uid] = document;
          this.setState({ document });
        });
    }
  };

  render() {
    const { languages, selectedLanguage, document } = this.state;

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
          {document &&
            <>
              <h1>{document.data.title[0].text}</h1>
              {document.data.description.map(({ text }, idx) =>
                <p key={idx}>{text}</p>)
              }
              <img
                src={document.data.image.url}
                alt={document.data.image.alt}
                style={{ maxWidth: '35vw' }}
              />
            </>
          }
        </main>
      </div>
    );
  }
}

export default App;
