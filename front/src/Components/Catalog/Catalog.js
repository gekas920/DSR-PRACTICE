import React from 'react';
import MaterialTable from 'material-table';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import PickUp from './PickUp'


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
            open:false
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    // componentWillMount() {
    //    crud.get('/equipment').then(result => {
    //        console.log(result);
    //        this.setState({data: result.data})
    //    });
    // }

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
