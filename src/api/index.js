import prismic from 'prismic-javascript';

const apiEndpoint = 'https://hontas.prismic.io/api/v2';
const prism = prismic.api(apiEndpoint);

export default {
  getLanguages: () =>
    prism
      .then((api) => api.getByUID('page', 'home'))
      .then((data) => [
        data.lang,
        ...data.alternate_languages.map(({ lang }) => lang)
      ])
  ,
  getPage: (name) =>
    prism.then((api) => api.getByUID('page', name))
};