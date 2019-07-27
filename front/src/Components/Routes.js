import React from 'react'
import {Router} from 'react-router-dom';
import {Route} from 'react-router'
import Form from './Form/Form'
import {createBrowserHistory} from "history";
import {Main} from "./MAIN/Main";

const hist = createBrowserHistory();



class Content extends React.Component{
    render() {
        return(
            <div>
               <Router history={hist}>
                <Route exact path="/" component={Form} />
                <Route exact path="/home" component={Main}/>
               </Router>
            </div>
        )
    }
}


export default Content