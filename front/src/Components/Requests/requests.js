import axios from 'axios'


const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
    headers: {'Authorization': ''}
});






export function setToken(token) {
    instance.headers.Authorization = token;
}


export const securedApi = '/api';

 export function create(url,body) {
   const cnt =  instance.put(url,body)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            console.log(error);
        });
   return cnt;
}

 export function update(url,body) {
   const cnt = instance.post(url,body)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        });
   return cnt;
}

 export async function get(url,params) {
     let exp = await instance.get(url,params)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            console.log(error);
        });
    return exp;
}

 export function remove() {
    instance.delete('/')
        .then(function (response) {
        })
        .catch(function (error) {
            console.log(error);
        });
}


