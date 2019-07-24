import axios from 'axios'


const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
    headers: {'Authorization': ''}
});
export const securedApi = '/api';




 export function create(url,body,config) {
     const token = localStorage.getItem('token');
     const defConf = {headers: {
         'Authorization': token ? token : ''
         }};
   const cnt =  instance.put(url,body,Object.assign({},config,defConf))
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            console.log(error);
        });
   return cnt;
}

 export function update(url,body,config) {
     const token = localStorage.getItem('token');
     const defConf = {headers: {
             'Authorization': token ? token : ''
         }};
   const cnt = instance.post(url,body,Object.assign({},config,defConf))
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        });
   return cnt;
}

 export async function get(url,body,config) {
     const token = localStorage.getItem('token');
     const defConf = {headers: {
             'Authorization': token ? token : ''
         }};
     let exp = await instance.get(url,Object.assign({},config,defConf))
        .then(function (response) {
            return response
        })
        .catch(function (error) {
        });
    return exp;
}

 export function remove(url,config) {
     const token = localStorage.getItem('token');
     const defConf = {headers: {
             'Authorization': token ? token : ''
         }};
    instance.delete(url,Object.assign({},config,defConf))
        .then(function (response) {
        })
        .catch(function (error) {
            console.log(error);
        });
}

axios.interceptors.response.use((response) =>{
   return response
},error => {
    localStorage.removeItem('token');
    localStorage.removeItem('info');
});

