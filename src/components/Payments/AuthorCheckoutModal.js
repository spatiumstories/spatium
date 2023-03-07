import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import AuthorCheckoutStepper from './AuthorCheckoutStepper';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: '100%', sm: '50%'},
  maxHeight: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll',
};

const AuthorCheckoutModal = (props) => {
  const [priceInNanos, setPriceInNanos] = useState(0);

  useEffect(() => {
    let usdPrice = props.nftToBuy.price;
    usdPrice = props.yearly ? usdPrice * 10 : usdPrice;
    usdPrice = usdPrice * 100; // in cents
    let desoToUsdCents =  1 / props.exchangeRate;

    setPriceInNanos(desoToUsdCents * usdPrice);
  }, []);

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
        sx={{
          overflow: 'scroll'
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
          <AuthorCheckoutStepper exchangeRate={props.exchangeRate} yearly={props.yearly} enoughFunds={props.enoughFunds} buyer={props.buyer} nftToBuy={props.nftToBuy} handleOnFailure={props.handleOnFailure} handleOnSuccess={props.handleOnSuccess} close={props.handleClose}/>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AuthorCheckoutModal;
