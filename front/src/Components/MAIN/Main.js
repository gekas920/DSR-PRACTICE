import React from 'react'
import Nav from "../Navbar/Nav";
import axios from 'axios'


const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
    headers: {'Authorization': ''}
});


class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            message:''
        };
    }

    // componentDidMount() {
    //     instance.interceptors.response.use((response) =>{
    //         console.log('Interceptor');
    //         console.log(response);
    //         if(response.status === 404){
    //             this.setState({
    //                 message:'not found'
    //             })
    //         }
    //         else {
    //             this.setState({
    //                 message:'12312'
    //             })
    //         }
    //         return response
    //     },error => {
    //     });
    // }

    render() {
        return(
            <div>
                <Nav/>
            </div>
        )
    }
}

export {Main,instance}