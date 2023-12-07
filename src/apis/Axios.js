import axios from 'axios';


const durl = "https://oop.cien.or.kr/"

export const getMainData = async(url)=>{

    try {
        const response = await axios.get(durl+url);
        return response.data;
      } catch (error) {
        return error;
      }    

}

