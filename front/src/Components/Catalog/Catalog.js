import React from 'react';
import MaterialTable from 'material-table';
import Dialog from '@material-ui/core/Dialog';
import * as crud from '../Requests/requests'
import Grid from '@material-ui/core/Grid';
import PickUp from './PickUp'


class MaterialTableDemo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            columns: [
                {title:'ID',field:'id'},
                { title: 'Name', field: 'name' },
                { title: 'Owner', field: 'owner'},
                { title: 'Availability', field: 'availability',type:'boolean'},
            ],
            data: [],
            current:{},
            open:false
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillMount() {
       crud.get(crud.securedApi + '/equipment').then(result => {
           this.setState({data: result.data})
       });
    }

    handleClickOpen = (event,rowData) => {
        this.setState({
            open: true,
            current:rowData
        })
    };

    handleClose = () => {
        this.setState({ open: false });
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
                <Dialog open={this.state.open} onClose={this.handleClose} ><PickUp
                    content = {this.state.current}/></Dialog>
            </div>
        );
    }
}

export default MaterialTableDemo
