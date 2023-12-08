import axios from 'axios';



export const getMainData = async(url)=>{

    try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        return null
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

