import prismic from 'prismic-javascript';

const apiEndpoint = 'https://hontas-test.prismic.io/api/v2';
const prism = prismic.api(apiEndpoint);
let ref;
let lastFetch;

const cache = new Map();
const defaultLocale = 'sv-se';

async function getByID(id) {
  const prismApi = await prism;
  return prismApi.getByID(id, { ref });
}

function getByUID(name, type = 'page', locale = defaultLocale) {
  lastFetch = [getByUID, [...arguments]];
  return queryPrismic({
    cacheId: ref
      ? `${ref}/${locale}/${type}-${name}`
      : `${locale}/${type}-${name}`,
    query: prismic.Predicates.at(`my.${type}.uid`, name),
    options: { lang: locale, ref }
  });
}

function getBySlug(slug, locale) {
  lastFetch = [getBySlug, [...arguments]];
  return queryPrismic({
    cacheId: ref ? `${ref}/${slug}` : slug,
    query: prismic.Predicates.at(`my.page.slug`, slug),
    options: {
      lang: locale || '*',
      ref
    }
  });
}

async function queryPrismic({ cacheId, query, options = {} }) {
  if (cache.has(cacheId)) return Promise.resolve(cache.get(cacheId));
  const prismApi = await prism;
  const { results } = await prismApi.query(query, options);
  const doc = results[0]
    ? {
        ...results[0],
        primsicRefs: prismApi.refs
      }
    : undefined;
  await resolvePageContent(doc);
  console.log(cacheId, doc);
  cache.set(cacheId, doc);
  return doc;
}

async function resolvePageContent(doc = {}) {
  if (doc.data && Array.isArray(doc.data.content)) {
    const contentPromises = doc.data.content.map((content) => {
      if (!content.content_link) return content;
      return getByID(content.content_link.id).then((linkedContent) => ({
        ...linkedContent.data,
        prismicType: linkedContent.type,
        id: linkedContent.id
      }));
    });

    const resolvedContent = await Promise.all(contentPromises);
    doc.data.content = resolvedContent;
  }
  return doc;
}

export default {
  setRef: (nextRef) => {
    ref = nextRef;
  },
  reFetch: () => {
    const [fn, args] = lastFetch;
    return fn.apply(null, args);
  },
  getApiInfo: () => fetch(apiEndpoint).then((resp) => resp.json()),
  getPageByUID: (name, locale) => getByUID(name, 'page', locale),
  getPageBySlug: (slug, locale) => getBySlug(slug, locale)
};
