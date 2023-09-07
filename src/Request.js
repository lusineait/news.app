import axios from 'axios';

const API_KEY = "a5ebe972b502417d985b892c16151083"; 


export function getNews() {
  return axios.get(`https://newsapi.org/v2/everything?q=keyword&apiKey=${API_KEY}`, {
    headers: {
      'X-Api-Key': API_KEY,
    },
  });
}

export function searchNews(searchQuery) {
    return axios.get(`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${API_KEY}`, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    });
  }

  export function getTopHeadlinesByCountry(country) {
    return axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    });
  }

  export function getTopHeadlinesByLanguage(language) {
    return axios.get(`https://newsapi.org/v2/top-headlines?language=${language}&apiKey=${API_KEY}`, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    });
  }

  export function getTopHeadlinesByCategory(category) {
    return axios.get(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${API_KEY}`, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    });
  }