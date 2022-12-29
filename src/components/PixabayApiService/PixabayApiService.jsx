import axios from 'axios';

export async function fetchImages(searchQuery, page = 1) {
  try {
    const API_KEY = '31497995-3a23ff7222cbe0a09e3b55558';
    const options = `image_type=photo&orientation=horizontal&safesearch=true&per_page=12`;
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&${options}&page=${page}`;

    return await axios.get(url);
  } catch (error) {
    console.log('Sorry failed to fetch');
  }
}
