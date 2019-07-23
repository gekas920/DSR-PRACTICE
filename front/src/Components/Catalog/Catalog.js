import React from 'react';
import MaterialTable from 'material-table';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import PickUp from './PickUp'
import * as crud from '../Requests/requests'
import Fab from '@material-ui/core/Fab';
import {makeStyles} from "@material-ui/core";
import CreateNew from './CreateNew'

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
    },
}));
const butt = {
    disabled:'block',
    width:'250px',
    backgroundColor: '#ffd432',
    marginLeft:'15%'
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
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.openAdd = this.openAdd.bind(this);
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


    handleClose = () => {
        this.setState({
            open: false,
            openAdd:false
        });
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
                <Fab  variant="extended" aria-label="Delete" className={useStyles.fab}
                      onClick={this.openAdd}
                      style={Object.assign({},butt,{display:this.state.admin ? 'block':'none'})}>
                    Create new
                </Fab>
                <Dialog open={this.state.openAdd} onClose={this.handleClose} ><CreateNew/></Dialog>
                <Dialog open={this.state.open} onClose={this.handleClose} ><PickUp
                    content = {this.state.current}/></Dialog>
            </div>
        );
    }
}

export default MaterialTableDemo
