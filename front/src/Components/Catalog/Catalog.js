import React from 'react';
import MaterialTable from 'material-table';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import PickUp from './PickUp'
import * as crud from '../Requests/requests'
import Fab from '@material-ui/core/Fab';
import {makeStyles} from "@material-ui/core";
import CreateNew from './CreateNew';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import ChangeCurrent from "./ChangeCurrent";
import DeleteEquip from "./DeleteEquip";

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
const redButt = {
    marginTop:'3px',
    paddingTop:'5px',
    backgroundColor: '#2cc6ff',
};
const delButt = {
    marginTop:'3px',
    paddingTop:'5px',
    backgroundColor:'white'
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
            data: [],
            current:{},
            admin:this.props.admin,
            open:false,
            openAdd:false,
            openDel:false,
            openRed:false
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.openAdd = this.openAdd.bind(this);
        this.openRed = this.openRed.bind(this);
        this.openDel = this.openDel.bind(this);
    }

     componentWillMount() {
        crud.get('/equipment').then(result => {
            this.setState({
                data:result.data
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

    openDel(){
        this.setState({
            openDel:true
        })
    }

    openRed(){
        this.setState({
            openRed:true
        })
    }


    handleClose = () => {
        this.setState({
            open: false,
            openAdd:false,
            openRed:false,
            openDel:false
        });
        crud.get('/equipment').then(result => {
            this.setState({
                data:result.data
            })
        })
    };
    render() {
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
                <Fab  aria-label="Edit"
                     style={Object.assign({},redButt,{display:this.state.admin ? 'inline-block':'none'})}
                      onClick={this.openRed}
                     className={useStyles.fab}>
                    <Icon>edit_icon</Icon>
                </Fab>
                <Fab aria-label="Delete"
                     style={Object.assign({},delButt,{display:this.state.admin ? 'inline-block':'none'})}
                     onClick={this.openDel}
                     className={useStyles.fab}>
                    <DeleteIcon  />
                </Fab>
                </div>
                <Dialog open={this.state.openAdd} onClose={this.handleClose} ><CreateNew/></Dialog>
                <Dialog open={this.state.openRed} onClose={this.handleClose} ><ChangeCurrent/></Dialog>
                <Dialog open={this.state.openDel} onClose={this.handleClose} ><DeleteEquip/></Dialog>
                <Dialog open={this.state.open} onClose={this.handleClose} ><PickUp content = {this.state.current}/></Dialog>
            </div>
        );
    }
}

export default MaterialTableDemo
