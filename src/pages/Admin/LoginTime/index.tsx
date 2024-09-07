import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Style from "./style.module.css";
import { useNavigate, useParams } from 'react-router';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import { TimeAgo } from '../../../components/Admin/SingleUserCard'; 
import { adminUrl } from '../../../BackendUrl';
import axios from 'axios';

const LoginTimes = () => {
  const [token] = React.useState(localStorage.adminLoginToken)
  const { LoginId } = useParams();
  const [users,setUsers]=React.useState(undefined)
  React.useEffect(()=>{
    Fetcher();
  },[])
  
  
  const Fetcher=()=>{
    axios.get(`${adminUrl}getalluserslogintimes`,{  headers: { 'authorization': `Bearer ${token}` } }).then((_response)=>{
      setUsers(_response.data.users)
    })
  }
  return (
    <section id={Style.Section}>
      <BasicTable users={users} />
      {LoginId && <FullDetails />}
    </section>
  )
}

export default LoginTimes

const rows:any = [];

export function BasicTable({users }:any) {

  const nav = useNavigate()
  return (<>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Names</TableCell>
            <TableCell align="right">Last login</TableCell>
            <TableCell align="right">Login count</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users&&users?.map((row:any) => {
  
            return(
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.firstname}  {row.lastname}
              </TableCell>
              <TableCell align="right"> </TableCell>
              <TableCell align="right">{row.LoginTimes.length}</TableCell>
              <TableCell align="right"><button onClick={() => nav(`/admin/dashboard/login-times/${row.unique_id}`)} className="custom-btn btn-1">View All </button></TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>

    </TableContainer>


  </>
  );
}



const FullDetails = () => {
  const nav = useNavigate()
  const handleClose = () => nav(-1);
  return (<>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={true}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={true}>

        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Login Details Of Adio damilare
          </Typography>
          <Typography id="transition-modal-description" sx={{
            mt: 1, overflowY: "scroll", height: "100%", border: "none",
            boxShadow: " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
            "::-webkit-scrollbar": {
              width: "5px",
            },
            "::-webkit-scrollbar-thumb": {
              width: "10px",
              backgroundColor: "rgb(175, 169, 169)",
              borderRadius: "10px",
            },
            borderRadius: "10px",
            padding: "5px 10px",
          }} component='div'>
            <DataTable/>

          </Typography>
        </Box>
      </Fade>
    </Modal>
  </>)
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  borderRadius: "10px",
  transform: 'translate(-50%, -50%)',
  width: "700px",
  height: "97%",
  bgcolor: 'background.paper',
  p: 3,
  border: "none",
  display: "grid",
  gridTemplateRows: "6% 93%",
  boxShadow: "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
  overFlowY: "scroll",
  maxHeight: "97%",
  '@media (max-width:700px)': {
    width: "100%",
  }
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'LoginTime', headerName: 'Login time', width: 130 },
  { field: 'format', headerName: 'In format', width: 130 },
  {
    field: 'Action',
    headerName: 'Action',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];


const datas = [
  { id: 1, 
    LoginTime:  new Date().toISOString().split('T')[0], 
    format: 99 },
  { id: 2,
    LoginTime:  new Date().toISOString().split('T')[0],
    format: 99 },
];

export function DataTable() {
  return (
    <div style={{ height: "100%", width: '100%' }}>
      <DataGrid
        rows={datas}
        columns={columns}
        
      />
    </div>
  );
}