// Default version (all methods)
import algoliasearch from 'algoliasearch';

// Search-only version
// import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch(process.env.NEXT_PUBLIC_ALOGILIA_PROJECT_ID, process.env.NEXT_PUBLIC_ALOGILIA_API_KEY);
const index = client.initIndex(process.env.NEXT_PUBLIC_ALOGILIA_INDEX_NAME);

export default index;