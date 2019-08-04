import React from 'react';
import MaterialTable from 'material-table';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import TakeEquip from './TakeEquip'
import * as crud from '../Requests/requests'
import Fab from '@material-ui/core/Fab';
import {makeStyles} from "@material-ui/core";
import CreateNew from './CreateNew';
import AddIcon from '@material-ui/icons/Add';
import {Redirect} from "react-router";

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
    },
}));
const butt = {
    marginTop:'3px',
    paddingTop:'5px',
    backgroundColor: '#ffd432',
};



class MaterialTableDemo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            columns: [
                { title: 'Name', field: 'name' },
                { title: 'Availability', field: 'availability',type:'boolean'},
                { title: 'Owner', field: 'owner'},
                { title: 'Last owner', field:'lastOwner'}
            ],
            id:this.props.id,
            data: [],
            current:{},
            admin:this.props.admin,
            open:false,
            openAdd:false,
            hasToken:true
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.openAdd = this.openAdd.bind(this);
    }

    componentDidMount() {
        crud.get('/equipment').then(result => {
            result.data.forEach(element=>{
               if(!element.owner) {
                   element.owner = '———';
               }
               if(!element.lastOwner){
                   element.lastOwner = '———';
               }
            });
            this.setState({
                data:result.data,
            })
        })
     }

    handleClickOpen = (event,rowData) => {
        this.setState({
            open: true,
            current:rowData
        })
    };

    openAdd(){
        this.setState({
            openAdd:true
        })
    }


    handleClose = () => {
        this.setState({
            open: false,
            openAdd:false,
        });
        crud.get('/equipment').then(result => {
            result.data.forEach(element=>{
                if(!element.owner) {
                    element.owner = '———';
                }
                if(!element.lastOwner){
                    element.lastOwner = '———';
                }
            });
            this.setState({
                data:result.data,
            })
        })
            .catch(err=>{
                localStorage.removeItem('token');
                this.setState({
                    hasToken:false
                })
            })
    };
    render() {
        if(!this.state.hasToken){
            return <Redirect to='/'/>
        }
        return (
            <div>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <Grid container justify="center">
                <MaterialTable
                    style={{width:'70%'}}
                    title="Equipment"
                    columns={this.state.columns}
                    data={this.state.data}
                    onRowClick={this.handleClickOpen}
                />
                </Grid>
                <div style={{
                    width:'70%',
                    margin:'0 auto'
                }}>
                <Fab  aria-label="Add" className={useStyles.fab}
                     onClick={this.openAdd}
                     style={Object.assign({},butt,{display:this.state.admin ? 'inline-block':'none'})}>
                    <AddIcon style={{color:'black'}}/>
                </Fab>
                </div>
                <Dialog open={this.state.openAdd} onClose={this.handleClose} ><CreateNew/></Dialog>
                <Dialog open={this.state.open} onClose={this.handleClose} >
                    <TakeEquip content = {this.state.current}
                               admin = {this.state.admin}
                               UserId = {this.state.id}
                    />
                </Dialog>
            </div>
        );
    }
}

export default MaterialTableDemo
