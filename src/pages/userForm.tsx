import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useState, type ChangeEvent, type SyntheticEvent } from 'react';
import { type FormFields } from '../constants/constants';
import NotifyUsers from './overlays/snackbar';
import { SAVE_USER_API } from '../constants/constants';
import Loading from './overlays/loading';

function UserForm() {
    const severity = "error";
    const sourceArray:string[] = ['Website', 'Instagram', 'Referral', 'Other'];
    const [messages, setMessages] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const initialState = {
        userName:'',
        email:'',
        phone:'',
        company:'',
        message:'',
        source:''
    }

    const [userForm, setUserForm] = useState<FormFields>(initialState);

    const handleNameChange = (event:ChangeEvent<HTMLInputElement>) => {
        setUserForm({...userForm, userName:event.target.value});
    }

    const handleMailChange = (event:ChangeEvent<HTMLInputElement>) => {
        setUserForm({...userForm, email:event.target.value});
    }

    const handlePhnChange = (event:ChangeEvent<HTMLInputElement>) => {
        setUserForm({...userForm, phone:event.target.value as string});
    }

    const handleCompanyChange = (event:ChangeEvent<HTMLInputElement>) => {
        setUserForm({...userForm, company:event.target.value});
    }

    const handleMessageChange = (event:ChangeEvent<HTMLInputElement>) => {
        setUserForm({...userForm, message:event.target.value});
    }

    const handleSourceChange = (event:SelectChangeEvent) => {
        setUserForm({...userForm, source:event.target.value});
    }


    const handleSubmit = async(event:SyntheticEvent) => {
        event.preventDefault();
        
        const err:string[] = handlemessages();

        if(err.length>0){
            setIsOpen(true);
            setMessages(err);
            return;
        } else {
            setMessages([]);
            setIsOpen(false);
        }

        setIsLoading(true);
        const response = await fetch(SAVE_USER_API, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userForm),
        })
        if(response && response.status === 200){
            setIsLoading(false);
            const successMsg:string[] = ["Your application submitted successfully"];
            setMessages(successMsg);
            setIsOpen(true);
            setUserForm(initialState);
        }
    }

    const handlemessages=() =>{
        const err:string[] = [];
        if(userForm.userName.length === 0){
            err.push(`Error: Name field is required`);
        }
        if(userForm.userName.length < 4){
            err.push("Error: Enter your full name");
        }
        if(userForm.email.length < 0){
            err.push("Error: Email field is required");
        }
        if(userForm.message.length > 2000) {
            err.push("Error: Message field should contains less than 2000 characters");
        }
        if(!userForm.email.includes("@")) {
            err.push("Please enter a valid emailId");
        }
        return err;
    }

    const handleSnackBarClose = () => {
        setIsOpen(false);
    };

    return (
        <>
        {messages && messages.length>0 && messages.map((err:string)=><NotifyUsers key={err} message={err} severity="error" isOpen={isOpen} handleClose={handleSnackBarClose}/>)}
        <Box component="form" id='user-form'
            onSubmit={handleSubmit} sx={{width:1, display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>

            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
            <Box sx={{width:1/3,display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                <TextField value={userForm?.userName} onChange={handleNameChange} 
                    sx={{p:1}} required id="name" label="Name" variant="filled" helperText="This field is required"/>
                <TextField value={userForm?.email} onChange={handleMailChange} 
                    sx={{p:1}} required id="email" label="Email" variant="filled" helperText="This field is required"/>
            </Box>

            <Box sx={{width:1/3,display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                <TextField value={userForm?.phone} onChange={handlePhnChange} sx={{p:1}} id="phone" label="Phone" variant="filled"/>
                <TextField value={userForm?.company} onChange={handleCompanyChange} sx={{p:1}} id="company" label="Company" variant="filled"/>
            </Box>
            </div>

            <Box sx={{width:1, mb:1, display:'flex',placeContent:'center'}}>
            <TextField multiline maxRows={5} value={userForm?.message} sx={{width:1/2, height:1}} onChange={handleMessageChange}
                id="message" label="Message" variant="filled"/>
            </Box>
            
            <Box sx={{width:1, display:'flex',placeContent:'center'}}>
            <FormControl sx={{width:1/2}}>
                <InputLabel id="source-label">Source</InputLabel>
                <Select
                    labelId="source-label"
                    id="source"
                    value={userForm?.source}
                    label="Source"
                    variant='filled'
                    onChange={handleSourceChange}
                    >{
                        sourceArray.map((src)=>(
                            <MenuItem value={src}>{src}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            </Box>

            <Button type='submit' sx={{width:1/3, mt:1, alignSelf:'center'}} variant='contained'>Submit</Button>
        </Box>
        {isLoading && <Loading/>}
        </>
    )
}

export default UserForm;