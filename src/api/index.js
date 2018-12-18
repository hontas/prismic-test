import prismic from 'prismic-javascript';

const apiEndpoint = 'https://hontas-test.prismic.io/api/v2';
const prism = prismic.api(apiEndpoint);

const cache = new Map();
const defaultLocale = 'sv-se';

function getByUID(name, type = 'page', locale = defaultLocale) {
  const cacheId = `${locale}/${type}-${name}`;
  if (cache.has(cacheId)) return Promise.resolve(cache.get(cacheId));
  return prism
    .then((api) =>
      api.query(prismic.Predicates.at(`my.${type}.uid`, name), { lang: locale })
    )
    .then((document) => {
      console.log(cacheId, document.results[0]);
      cache.set(cacheId, document.results[0]);
      return document.results[0];
    });
}

function getBySlug(slug, locale = defaultLocale) {
  const cacheId = `${locale}/${slug}`;
  if (cache.has(cacheId)) return Promise.resolve(cache.get(cacheId));
  return prism
    .then((api) =>
      api.query(prismic.Predicates.at(`my.page.slug`, slug), { lang: locale })
    )
    .then((document) => {
      console.log(cacheId, document.results[0]);
      cache.set(cacheId, document.results[0]);
      return document.results[0];
    });
}

export default {
  getLanguages: () =>
    getByUID('home').then((data) => [
      data.lang,
      ...data.alternate_languages.map(({ lang }) => lang)
    ]),
  getPageByUID: (name, locale) => getByUID(name, 'page', locale),
  getPageBySlug: (slug, locale) => getBySlug(slug, locale)
};
