import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Checkout from './Checkout';
import CheckoutRareStepper from './CheckoutRareStepper';
import CheckoutStepper from './CheckoutStepper';
import CheckoutRare from './CheckoutRare';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: '100%', sm: '50%'},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CheckoutModal = (props) => {

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
            {props.bookToBuy.type === "MOD" && props.altPayment ? (
              <CheckoutStepper bookData={props.bookToBuy} handleOnFailure={props.handleOnFailure} handleOnSuccess={props.handleOnSuccess} close={props.handleClose}/>) : 
              props.bookToBuy.type === "MOD" ? (
                <Checkout handleAltPayment={props.setAltPayment} bookData={props.bookToBuy} handleOnFailure={props.handleOnFailure} handleOnSuccess={props.handleOnSuccess} close={props.handleClose}/>) : (
              <CheckoutRareStepper bookData={props.bookToBuy} handleOnFailure={props.handleOnFailure} handleOnSuccess={props.handleOnSuccess} close={props.handleClose}/>)
            }
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CheckoutModal;
