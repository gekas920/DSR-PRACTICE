import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';

 export function create(url,body) {
    axios.put(url,body)
        .then(function (response) {
        })
        .catch(function (error) {
            console.log(error);
        });
}

 export function update(url,body) {
    axios.post(url,body)
        .then(function (response) {
        })
        .catch(function (error) {
            console.log(error);
        });
}

 export async function get(url) {
     let exp = await axios.get(url)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            console.log(error);
        });
    return exp;
}

 export function remove() {
    axios.delete('/')
        .then(function (response) {
        })
        .catch(function (error) {
            console.log(error);
        });
}


