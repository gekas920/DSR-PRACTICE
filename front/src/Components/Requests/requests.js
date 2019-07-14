import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';

 export function create(url,body) {
    axios.put(url,body)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

 export function update(url,body) {
    axios.post(url,body)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

 export function get(url) {
    axios.get(url)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

 export function remove() {
    axios.delete('/')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}


