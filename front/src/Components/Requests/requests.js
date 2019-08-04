import {instance} from "../MAIN/Main";
import axios from 'axios'

export const securedApi = '/api';


instance.interceptors.response.use(function (res) {
    return res;
},function (error) {
    if(error.response.status === 457){
            window.location = '/';
            localStorage.clear();

    }
});

 export function create(url,body,config) {
     const token = localStorage.getItem('token');
     const defConf = {headers: {
         'Authorization': token ? token : ''
         }};
   const cnt =  instance.put(securedApi+url,body,Object.assign({},config,defConf))
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
   const cnt = instance.post(securedApi+url,body,Object.assign({},config,defConf))
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        });
   return cnt;
}

 export async function get(url,config) {
     const token = localStorage.getItem('token');
     const defConf = {headers: {
             'Authorization': token ? token : ''
         }
     };
     let exp = await instance.get(securedApi+url,Object.assign({},config,defConf))
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
    instance.delete(securedApi+url,Object.assign({},config,defConf))
        .then(function (response) {
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function login(url,body,config) {
    const cnt =  instance.post(url,body,config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            console.log(error);
        });
    return cnt;
}

export function register(url,body,config) {
    const cnt = instance.post(url,body,config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        });
    return cnt;
}

export function uploadPic(url,body) {
    const contentType = {
        headers:{
            "content-type":"multipart/form-data"
        }
    };
    axios.post(url, body, contentType).then(r  =>{});
}



