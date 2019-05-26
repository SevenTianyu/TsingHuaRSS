import axios from 'axios'

export function getSlider() {
  return axios.get('api/news/latest').then((res) => {
    // alert(1)
    return Promise.resolve(res)
  })
}

export function getNews() {
  return axios.get('api/news/latest').then((res) => {
    return Promise.resolve(res)
  })
}
