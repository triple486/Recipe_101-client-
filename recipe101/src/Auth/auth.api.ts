import axios, {AxiosRequestConfig} from 'axios'

export interface Credentials {
    username: string;
    password: string;
}

const BASE_URL='http://ec2-15-165-205-147.ap-northeast-2.compute.amazonaws.com/'


export const onLogin = async (data : Credentials) => {
    const requestConfig: AxiosRequestConfig = {
        method: 'post',
        url: BASE_URL +'./signin',
        data,
    }
    try {
        const {data: response} = await axios.request(requestConfig)

    } catch(e) {
        console.error(e);
        return {error: e.response.data.message
        }
    }

}


export const onRegister = async (data: Credentials) => {
    const requestConfig: AxiosRequestConfig = {
        method: 'post',
        url: BASE_URL + '/signup',
        data
    }

    try {
        const {data: response} = await axios.request(requestConfig)

    } catch(e) {
        console.error(e.response);
        return {error: e.response.data.message}
    }
}