import { BACKEND_URL } from '@env'
import axios from 'axios'

export default axios.create({
    baseURL: `${BACKEND_URL}api/`,
    responseType: 'json',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})