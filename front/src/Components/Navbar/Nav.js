import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {withStyles} from "@material-ui/styles";
import Catalog from '../Catalog/Catalog'
import User from "../User/User";
import Equip from "../Equip/Equip";

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


class CenteredTabs extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:1
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, newValue) {
        this.setState({value:newValue});
    }
    render() {
        const {classes} = this.props;
        return (
            <div>
            <Paper className={classes.root}>
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
                </Tabs>
            </Paper>
                {this.state.value === 0 && <Catalog/>}
                {this.state.value === 1 && <Equip/>}
                {this.state.value === 2 && <User/>}
            </div>
        );
    }
}


export default withStyles(styles)(CenteredTabs);
