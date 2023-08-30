import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import styled from 'styled-components';

const Loading = ()=>{
    return(
        <Boxing sx = {{ display: 'flex'}}>
            <Stack sx={{ color: '#a32638' }} >
                <CircularProgress color='inherit'/>
            </Stack>
        </Boxing>
        )
}

const Boxing = styled(Box)`
margin: 100px auto;
`
export default Loading