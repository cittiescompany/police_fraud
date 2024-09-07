import React from 'react'
import { useNavigate, useParams } from 'react-router'
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  borderRadius: "10px",
  transform: 'translate(-50%, -50%)',
  width: "800px",
  height: "97%",
  bgcolor: 'background.paper',
  p: 3,
  border: "none",
  display: "grid",
  gridTemplateRows: "6% 93%",
  boxShadow: "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
  overFlowY: "scroll",
  maxHeight: "97%",
  '@media (max-width:800px)': {
    width: "98%",
  }
};

const SingleSave2Buy = () => {
  const nav = useNavigate();
  const [state, setState] = React.useState<any>(undefined);
  const { productId } = useParams();
  
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={true}
        onClose={() => { nav(-1) }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 1000,
          },
        }}
      >
        <Fade in={true}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              More Details
            </Typography>
            <Typography id="transition-modal-description" sx={{
              mt: 1, overflowY: "scroll", height: "100%", border: "none",
              boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
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
              overflowX: "hiddeen",
              '@media (max-width:800px)': {
                overflowX: "scroll",
                width: "100%",
              },
              "main": {
                width: "90%",
                '@media (max-width:556px)': {
                  width: "556px",
                  padding: "5px",
                },
                padding: " 10px",
                margin: "30px auto",
                boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                borderRadius: "10px",
                'div':{
                  display:'grid',
                  gridTemplateColumns: '50% 50%',
                  margin:"10px 0",
                  fontSize:"1.2rem",
                  'span':{
                  }

                }
              }
            }} component='div'>
              <main>
                <h4 className='text-center'>Product details</h4>
                <div>
                  <b>Product Name</b>
                  <span>{state && state?.name}</span>
                </div>
                <div>
                  <b>Product Amount</b>
                  <span>N{state && state?.productAmount}</span>
                </div>
                <div>
                  <b>Upfront payment</b>
                  <span>N{state && state?.upFront}</span>
                </div>

                <div>
                  <b>Installment</b>
                  <span>{state && state?.installment}</span>
                </div>

                <div>
                  <b>Number of installment</b>
                  <span>{state && Math.round(state?.numberOfInstallment)}</span>
                </div>

                <div>
                  <b>Product Image</b>
                  <span>{state && state?.image==='hello'?'Not provided':
                  <>
                    <img src={state?.image} alt={state?.image} width={200} height={200}/>
                  </>
                  }</span>
                </div>
              </main>

              <main>
                <h4 className='text-center'>Customer details</h4>
                <div>
                  <b>Name</b>
                  <span>{state && `${state?.user?.firstname} ${state?.user?.lastname}`}</span>
                </div>
                <div>
                  <b>Phone Number</b>
                  <span>0{state && state?.user?.phonenumber ||"Not provided"}</span>
                </div>
                <div>
                  <b>Country</b>
                  <span>{state && state?.user?.country||"Not provided"}</span>
                </div>

                <div>
                  <b>City</b>
                  <span>{state && state?.user?.city||'Not provided'}</span>
                </div>
              </main>

              <main>
                <h4 className='text-center'>Next of Kin details</h4>
                <div>
                  <b>Name</b>
                  <span>{state && `${state?.NOKname}`}</span>
                </div>
                <div>
                  <b>Phone Number</b>
                  <span>0{state && state?.NOKphonenumber}</span>
                </div>
                <div>
                  <b>Relationship</b>
                  <span>{state && state?.NOKrelationship}</span>
                </div>

                <div>
                  <b>City</b>
                  <span>{state && state?.user?.city||'Not provided'}</span>
                </div>
              </main>

              <main>
                <h4 className='text-center'>Merchant details</h4>
                <div>
                  <b>Business name</b>
                  <span>{state && `${state?.Mbusinessname}`}</span>
                </div>
                <div>
                  <b>Phone Number</b>
                  <span>0{state && state?.Mwhatsappnumber}</span>
                </div>
                <div>
                  <b>Address</b>
                  <span>{state && state?.Maddress}</span>
                </div>
              </main>

              <main>
                <h4 className='text-center'>Delivery details</h4>
                <div>
                  <b>Delivery address</b>
                  <span>{state && `${state?.deliveryAddress}`}</span>
                </div>
                <div>
                  <b>Land mark</b>
                  <span>0{state && state?.landMark}</span>
                </div>
                <div>
                  <b>Nearest bustop</b>
                  <span>{state && state?.nearestBustop}</span>
                </div>
              </main>


            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default SingleSave2Buy