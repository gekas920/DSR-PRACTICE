import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import stylesElem from './Navbar_Account.css'
import {withStyles} from "@material-ui/styles";
import Catalog from '../Catalog/Catalog'
import User from "../User/User";
import Equip from "../Equip/Equip";

const styles = {
    root: {
        flexGrow: 1,
        backgroundColor:'#2cc6ff',
    },
};


class CenteredTabs extends React.Component{
    //const [value, setValue] = React.useState(0);
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
                <Tabs className={stylesElem.tab}
                      value={this.state.value}
                      onChange={this.handleChange}
                      TabIndicatorProps={{
                          style: {
                              backgroundColor: "#ffd432"
                          }}}
                      textColor="primary"
                      centered
                >
                    <Tab  className="tab" label="Catalog" />
                    <Tab  label="My equip" />
                    <Tab  label="Profile" />
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
