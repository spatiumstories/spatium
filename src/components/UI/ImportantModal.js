import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Stack from '@mui/material/Stack';


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

const ImportantModal = (props) => {

  const handleCancel = () => {
    props.cancel();
  }

  const handlePublish = () => {
    props.publish();
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={handleCancel}
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
                    <PriorityHighIcon/>
                </Avatar>
                {props.children}
                <Stack direction="row" spacing={2}>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button variant="contained" onClick={handlePublish}>{props.buttonText}!</Button>
                </Stack>
              </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ImportantModal;
