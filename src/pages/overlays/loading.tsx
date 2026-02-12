import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';


function Loading () {
    return(
        <Stack sx={{ color: 'grey.500', display:'flex', justifyContent:'center' }} spacing={2} direction="row">
            <CircularProgress color="secondary" />
        </Stack>
    )
}

export default Loading;