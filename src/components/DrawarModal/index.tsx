import React from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { RxCross1 } from "react-icons/rx"
import Styled from "styled-components";
import { useGetWindowAvailSize } from "../../Hooks";


export function TemporaryDrawer({ state, padding="40px", cancel=true, setState, children: modal }: any) {
  const {width}=useGetWindowAvailSize()
    const toggleDrawer = (open: any) => (event: any) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setState(open);
    };
    const Lists = () => (
      <Box
        sx={{ 
        width: "450px", 
        height:"82%", 
        paddingBottom:"40px",
        px:padding,
        "::-webkit-scrollbar":{
          width:"1px !important",
          display: "none",
        },
        "@media (max-width:450px)":{
          width: `${width}px`,
          px:"10px",
          paddingBottom:"80px",
          minWidth:"320px",
        }}}
        role="presentation"
      >
        <List style={{position:"absolute"}}>
          {modal}
        </List>
      </Box>
    );
    
  
    return (
      <div>
        <React.Fragment >
          <Drawer
            anchor={'right'}
            open={state}
            onClose={toggleDrawer(false)}
            sx={{
              width:"100%",
            }}
            >
            <main style={{ marginBottom:"30px",height:"100%",overflowY:"hidden",width:"100%",
            minWidth:"100%",
          }}>
            {cancel?<CancelButton setState={setState} />:null}
            {Lists()}
            </main>
          </Drawer>
        </React.Fragment>
  
      </div>
    );
  }
  
  const CancelButton = ({ setState }: any) => {
    return (
      <Section>
        <Button onClick={() => setState(false)}>
          <RxCross1 />
        </Button>
      </Section>
    )
  }
  
  const Section = Styled.section`
    display:flex;
    justify-content:flex-end;
    padding:20px 40px;
    height:10%;
    svg{
      font-size:1.6rem;
      font-weight:700;
    }
  `
  