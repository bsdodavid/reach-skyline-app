import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Modal, Box } from "@mui/material";
import { type FormFields } from "../constants/constants";
import { USER_FIELD_CONSTANTS } from "../constants/constants";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ExpandedList ({user, modalOpen, onClose}:{user:FormFields, modalOpen:boolean, onClose:()=>void}) {

    return (
        <Modal 
            open={modalOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{width:1, overflowY:'auto'}}
        >
            <Box sx={[style, {width:1000}]}>
            <TableContainer>
                <Table >
                    <TableHead>
                        
                        <TableRow>
                            {
                                USER_FIELD_CONSTANTS.map((field:string, i)=>(
                                    <TableCell key={i}>{field}</TableCell>
                                ))
                            }
                        </TableRow>
                        
                        
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            {
                                //Ts identifies object keys as string[] so had to mention the key type explicitly using as keyword
                                (Object.keys(user) as (keyof FormFields)[]).map((key, i)=>(
                                <TableCell key={i} sx={{maxWidth:600, wordBreak:'break-word', whiteSpace:'normal'}}>{user[key]}</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            </Box>
        </Modal>
        
    )
}

export default ExpandedList