import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios, { type AxiosResponse } from "axios";
import { type FormFields } from "../constants/constants";
import {type GridColDef} from '@mui/x-data-grid';
import Loading from "./overlays/loading";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import ExpandedList from '../pages/expanderList';
import { type GridRenderCellParams } from "@mui/x-data-grid";
import { GET_USER_API } from "../constants/constants";
import NotifyUsers from "./overlays/snackbar";

function UserDetails() {
    const message = "No Data Available at the moment, add new data to see changes";
    const [userData, setUserData] = useState<FormFields[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [rowData, setRowData] = useState<FormFields>({
        id:0,
        userName:'',
        email:'',
        phone:'',
        company:'',
        message:'',
        source:''
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const USER_HEADER_COLUMN:GridColDef<FormFields>[] =[
        { field:"id", headerName: 'ID', width: 30 },
        { field:"userName", headerName: 'User', width: 130 },
        { field:"email", headerName: 'Email', width: 190 },
        { field:"phone", headerName: 'Phone', width: 130 },
        { field:"company", headerName: 'Company', width: 130 },
        { field:"message", headerName: 'Message', width: 350 },
        { field:"source", headerName: 'Source', width: 100 },
        { field: 'action', headerName: 'Action', width: 200, sortable: false, renderCell:(params:GridRenderCellParams<FormFields>)=>(
            <Button
                variant='contained'
                size='small'
                onClick={()=>{setShowModal(true); setRowData({...rowData, 
                    id:params.row.id,
                    userName:params.row.userName,
                    email:params.row.email,
                    phone:params.row.phone,
                    company:params.row.company,
                    message:params.row.message,
                    source:params.row.source
                }); }}
            >Show message</Button>
        )}
        
    ]

    const fetchJson = async() => {
        setIsLoading(true);
        axios.get<FormFields[]>(GET_USER_API).then((res:AxiosResponse)=>{
            if(res.status === 200 && res.data && res.data.users && res.data.users.length > 0){
                setUserData(res.data.users);
                setIsOpen(false);
            } else {
                setIsOpen(true);
            }

            setIsLoading(false);
            console.log(res.data);
        })
    }

    const handleSnackBarClose = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        fetchJson();
    },[]);
    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <>
            {isLoading && <Loading/>}
            {
                userData && userData.length > 0?
                (<Paper sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={userData}
                        columns={USER_HEADER_COLUMN}
                        initialState={{pagination:{paginationModel},
                            filter:{
                                filterModel:{
                                    items:[]
                                }
                            }        
                        }}
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                        pageSizeOptions={[5,10]}
                        sx={{ border: 0 }}
                        showToolbar
                    />
                </Paper>):<NotifyUsers message={message} isOpen={isOpen} handleClose={handleSnackBarClose}/>
            }
            {
                showModal && <ExpandedList user={rowData} modalOpen={showModal} onClose={()=>setShowModal(false)}/>
            }
        </>
        
    )
}

export default UserDetails;