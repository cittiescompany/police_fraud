import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function ChildModal() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  // const [state,setState] = useState<any>(localStorage.kunpexchange);


    const { admin} = useSelector((state: any) => state)
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e:any) => {
      e.preventDefault(); // Prevent the default browser prompt
        setDeferredPrompt(e);
    });
  }, []);
  

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          setDeferredPrompt(null)
        } else {
          console.log('User dismissed the A2HS prompt');
        }
      });
    }
  };

  const handleClose = () => {
    localStorage.kunpexchange = "kunpexchange";
  
  };


  return (
    <React.Fragment>
      {
        false?
          <Modal
            open={true}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={style}>
              <div>
                <p>To ease your accesibility of this app add it to home screen</p>
                <Button onClick={handleInstallClick} className='border-1'>Add to home screen</Button>
              </div>
            </Box>
          </Modal>
          :<>
          </>
      }
    </React.Fragment>
  );
}

