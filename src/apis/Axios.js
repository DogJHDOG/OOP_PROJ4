import axios from 'axios';

const baseURL = 'https://oop.cien.or.kr';

const api = axios.create({
  baseURL: baseURL,
});

export const getMainData = async(url)=>{

    try {
        const response = await api.get(url);
        return response.data;
      } catch (error) {
        return error
      }    

}

export const getDetailNotice = async(url)=>{
  console.log(url)
  try {
    const response = await axios.get('api'+url);
    return response.data;
  } catch (error) {
    return null;
  }    
}

