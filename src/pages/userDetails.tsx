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

function UserDetails() {
    const [userData, setUserData] = useState<FormFields[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [rowData, setRowData] = useState<FormFields>({
        userName:'',
        email:'',
        phone:'',
        company:'',
        message:'',
        source:''
    });

    const USER_HEADER_COLUMN:GridColDef<FormFields>[] =[
        { field:"id", headerName: 'ID', width: 30 },
        { field:"userName", headerName: 'User', width: 130 },
        { field:"email", headerName: 'Email', width: 170 },
        { field:"phone", headerName: 'Phone', width: 130 },
        { field:"company", headerName: 'Company', width: 130 },
        { field:"message", headerName: 'Message', width: 300 },
        { field:"source", headerName: 'Source', width: 130 },
        { field: 'action', headerName: 'Action', width: 150, sortable: false, renderCell:(params:GridRenderCellParams<FormFields>)=>(
            <Button
                variant='contained'
                size='small'
                onClick={()=>{setShowModal(true); setRowData({...rowData, 
                    userName:params.row.userName,
                    email:params.row.email,
                    phone:params.row.phone,
                    company:params.row.company,
                    message:params.row.message,
                    source:params.row.source
                }); console.log(typeof(params.row));}}
            >Show message</Button>
        )}
        
    ]
    console.log("showModal", showModal);
    const fetchJson = async() => {
        axios.get<FormFields[]>("http://localhost:3000/get-user").then((res:AxiosResponse)=>{
            if(res.status === 200 && res.data && res.data.users && res.data.users.length > 0){
                setUserData(res.data.users);
            }
            console.log(res.data);
        })
    }

    useEffect(() => {
        fetchJson();
    },[]);
    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <>
            {
            userData && userData.length > 0?
            (<Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={userData}
                    columns={USER_HEADER_COLUMN}
                    initialState={{pagination:{paginationModel}}}
                    pageSizeOptions={[5,10]}
                    sx={{ border: 0 }}
                    
                />
            </Paper>):<Loading/>
            }
            {
                showModal && <ExpandedList user={rowData} modalOpen={showModal} onClose={()=>setShowModal(false)}/>
            }
        </>
        
    )
}

export default UserDetails;