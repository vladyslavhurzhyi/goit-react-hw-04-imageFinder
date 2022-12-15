import axios from 'axios';

const KEY = '17568064-fe285d9450a7ecb893916a0ce';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const FetchPixabayImage = async (query, page) => {
  const response = await axios.get('', {
    params: {
      q: query,
      key: KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      page: page,
      per_page: 12,
    },
  });

  const hits = response.data.hits.map(
    ({ id, webformatURL, largeImageURL }) => ({
      id,
      webformatURL,
      largeImageURL,
    })
  );

  return { hits, totalHits: response.data.totalHits };
};
