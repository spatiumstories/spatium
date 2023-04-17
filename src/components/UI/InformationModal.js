import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const InformationModal = (props) => {

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
              <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
              }}>
                <Typography component="h1" variant="h5">{props.title}</Typography>
                <Avatar sx={{m: 1}}>
                    <HelpIcon/>
                </Avatar>
                {props.children}
                <Button onClick={props.handleClose}>Ok</Button>
              </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default InformationModal;
