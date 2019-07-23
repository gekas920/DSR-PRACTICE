import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {withStyles} from "@material-ui/styles";
import Catalog from '../Catalog/Catalog'
import User from "../User/User";
import Equip from "../Equip/Equip";
import {Redirect} from "react-router";
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    root: {
        flexGrow: 1,
        backgroundColor:'#2cc6ff',
        height:'65px'
    },
};

const tabsStyle ={
    fontWeight: 'bold',
    fontSize:'15px',
    color:'white',
    marginRight:'60px',
    height: '65px'
};

const logo = {
    position:'absolute',
    marginTop:'25px',
    marginLeft:'17px',
    width:'10%'
};


class CenteredTabs extends React.Component{
    constructor(props){
        const token = localStorage.getItem('token');
        super(props);
        this.state = {
            value:0,
            id:'',
            name:'',
            email:'',
            phone:'',
            date:'',
            admin:'',
            hasToken:!!token,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    componentWillMount() {
        const info = JSON.parse(localStorage.getItem('info'));
        this.setState(info);
    }

    handleChange(event, newValue) {
        this.setState({value:newValue});
    }

    handleClick(){
        localStorage.removeItem('token');
        localStorage.removeItem('info');
         this.setState({hasToken:false});
    }

    updateState(value){
        this.setState({
            name:value.name,
            email:value.email,
            phone:value.phone,
            date:value.date,
        });
    };

    render() {
        const {classes} = this.props;
        if(!this.state.hasToken){
            return <Redirect to='/'/>
        }
        else {
            return (
                <div>
                    <Paper className={classes.root}>
                        <CircularProgress disableShrink  style={{
                            position:"absolute",
                            marginLeft:'10px',
                            color:'#ffd432',
                        }} size={65}/>
                        <p style={logo}>Super app</p>
                        <Tabs className='tab'
                              value={this.state.value}
                              onChange={this.handleChange}
                              TabIndicatorProps={{
                                  style: {
                                      backgroundColor: "#ffd432",
                                  }}}
                              textColor="primary"
                              centered
                        >
                            <Tab style={tabsStyle} label="Catalog" />
                            <Tab style={tabsStyle} label="My equip" />
                            <Tab style={tabsStyle} label="Profile" />
                            <Tab style={Object.assign({},tabsStyle,
                                {position:'absolute',right:0,backgroundColor:'#ffd432',borderRadius:'5px'})}
                                 onClick={this.handleClick}
                                 label="Log out"/>
                        </Tabs>
                    </Paper>
                    {this.state.value === 0 && <Catalog admin = {this.state.admin}/>}
                    {this.state.value === 1 && <Equip/>}
                    {this.state.value === 2 && <User info = {this.state} updateData = {this.updateState}/>}
                </div>
            );
        }
    }
}


export default withStyles(styles)(CenteredTabs);
