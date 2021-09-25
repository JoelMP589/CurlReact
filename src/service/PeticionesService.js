
import axios from 'axios';



export default class PeticionesService {

    metodoGet = async (url) => {
        try {
            const res = await axios.get(url).then(response => response);
            return res;
        } catch (error) {
            return error;
        }

    }

    metodoPost = async (url, body) => {
        try {
            console.log(body);
            const res = await axios.post(url, body).then(response => response);
            return res;
        } catch (error) {
            return error;
        }

    }

    metodoDelete = async (url, body) => {
        try {
            const res = await axios.delete(url, body).then(response => response);
            return res;
        } catch (error) {
            return error;
        }

    }

    metodoPut = async (url, body) => {
        try {
            const res = await axios.put(url, body).then(response => response);
            return res;
        } catch (error) {
            return error;
        }

    }

}


