import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { Button } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import BookIcon from '@mui/icons-material/Book';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import GenrePicker from './GenrePicker';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import HelpIcon from '@mui/icons-material/Help';
import InformationModal from '../UI/InformationModal';


const dragonText = "The dragon protocol protects your IP. By using the dragon (default) your book file is encrypted before being uploaded to the blockchain. The keys to decrypt your book file are only shared between you and Spatium Stories. We ensure anyone who buys your book can read it, but cannot have access to the actual file. By turning this off, you are allowing your book to be 100% decentralized, but your book file is free for anyone to download and copy."
const secondText = "Secondary sales royalties is the percentage you get to keep as the author on any secondary sales of your book. If you set 5% and your RARE book resells for $500 then you automatically receive $25 of that sale. Typical range is 5-10%"
const mintingText = "Do you want to mint these NFT books under your own account or project or under SpatiumPublisher? Your payment and royalties stay the same, it's just a matter of how you want it to show up on the Deso blockchain. For instance, if you are a new author, we suggest SpatiumPublisher to help build an audience and get your first sale."

const RoyaltiesForm = (props) => {
    const [dragonOpen, setDragonOpen] = useState(false);
    const [secondOpen, setSecondOpen] = useState(false);
    const [mintingOpen, setMintingOpen] = useState(false);

    const handleMintingClose = () => {
        setMintingOpen(false);
    }

    const handleMintingOpen = () => {
        setMintingOpen(true);
    }
  
    const handleDragonClose = () => {
      setDragonOpen(false);
    }
  
    const handleDragonOpen = () => {
        setDragonOpen(true);
    }

    const handleSecondClose = () => {
        setSecondOpen(false);
      }
    
    const handleSecondOpen = () => {
        setSecondOpen(true);
    }

    const [err, setErr] = useState({
        royalties: false,
        genre: false,
        format: false,
        fictionType: false,
    });

    const [currDetails, setCurrDetails] = useState({
        royalties: "",
        genre: [],
        forSale: true,
        dragon: true,
        format: "",
        fictionType: "",
        mintingAccount: "spatium",
    });

    const handleBack = () => {
        props.handleDetailsChange(currDetails);
        props.handleBack();
    }

    const validateInput = () => {
        let errCheck = {
            royalties: false,
            genre: false,
            format: false,
        };
        let valid = true;
        if (currDetails.fictionType === "") {
            errCheck.fictionType = true;
            valid = false;
        }
        if (currDetails.royalties === "") {
            errCheck.royalties = true;
            valid = false;
        }
        if (currDetails.genre === "") {
            errCheck.genre = true;
            valid = false;
        }
        if (currDetails.format === "") {
            errCheck.format = true;
            valid = false;
        }
        if (valid) {
            props.handleDetailsChange(currDetails);
            props.handleNext();
        } else {
            setErr(errCheck);
        }
    }
    useEffect(() => {
        if (props.details !== null) {
            setCurrDetails(props.details);
        }
    }, []);

    const handleMintingAccountChange = (event) => {
        setCurrDetails(oldDetails => {
            return {
                ...oldDetails,
                mintingAccount: event.target.value,
            };
        });
    }

    const handleRoyaltiesChange = (event) => {
        setErr(oldErr => {
            return {
                ...oldErr,
                royalties: false,
            }
        });
        setCurrDetails(oldDetails => {
            return {
                ...oldDetails,
                royalties: event.target.value,
            };
        });
    }

    const handleGenreChange = (genres) => {
        setErr(oldErr => {
            return {
                ...oldErr,
                genre: false,
            }
        });        
        setCurrDetails(oldDetails => {
            return {
                ...oldDetails,
                genre: genres,
            };
        });
    }

    const handleForSaleChange = (event) => {
        setCurrDetails(oldDetails => {
            return {
                ...oldDetails,
                forSale: event.target.checked
            };
        });
    }

    const handleDragonChange = (event) => {
        setCurrDetails(oldDetails => {
            return {
                ...oldDetails,
                dragon: event.target.checked
            };
        });
    }

    const handleFormatChange = (event) => {
        setErr(oldErr => {
            return {
                ...oldErr,
                format: false,
            }
        });
        setCurrDetails(oldDetails => {
            return {
                ...oldDetails,
                format: event.target.value,
            };
        });
    }

    const handleFictionChange = (event) => {
        setErr(oldErr => {
            return {
                ...oldErr,
                fictionType: false,
            }
        });
        setCurrDetails(oldDetails => {
            return {
                ...oldDetails,
                fictionType: event.target.value,
            };
        });
    }


    return (
        <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Royalties, Genre, and Extra Details
        </Typography>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel id="royalty-amount">
                Secondary Sales Royalty <HelpIcon sx={{cursor: "pointer"}}onClick={handleSecondOpen}/>
            </InputLabel>
            <OutlinedInput
                id="royalty-amount"
                startAdornment={<InputAdornment position="start">%</InputAdornment>}
                label="Secondary Sales Royalty ??"
                value={currDetails.royalties}
                onChange={handleRoyaltiesChange}
                error={err.royalties}
                type="number"
            />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{m: 1, width: '100%'}} required>
                <InputLabel id="format-type">
                    Book or short story?
                </InputLabel>
                <Select
                    required
                    labelId="format-type"
                    onChange={handleFormatChange}
                    value={currDetails.format}
                    id="format-type"
                    input={<OutlinedInput id="format-type" label="Book or short story?"/>}
                >
                    <MenuItem value={"book"}>Book</MenuItem>
                    <MenuItem value={"story"}>Short Story</MenuItem>
                </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" spacing={0.25} alignItems="center" justifyContent="center">
                {currDetails.forSale && <Switch defaultChecked onChange={handleForSaleChange} color="secondary" />}
                {!currDetails.forSale && <Switch onChange={handleForSaleChange} color="secondary" />}
                <Typography align="center">Set For Sale</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" spacing={0.25} alignItems="center" justifyContent="center">
                {currDetails.dragon && <Switch defaultChecked onChange={handleDragonChange} color="secondary" />}
                {!currDetails.dragon && <Switch onChange={handleDragonChange} color="secondary" />}
                <Typography 
                    align="center"
                >
                    Dragon Protected
                </Typography>
                <HelpIcon sx={{cursor: "pointer"}}
                    onClick={handleDragonOpen}
                />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{m: 1, width: '100%'}} required>
                <InputLabel id="fiction-type">
                    Fiction or Non-fiction?
                </InputLabel>
                <Select
                    required
                    labelId="fiction-type"
                    onChange={handleFictionChange}
                    value={currDetails.fictionType}
                    id="fiction-type"
                    input={<OutlinedInput id="fiction-type" label="Fiction or Non-fiction"/>}
                >
                    <MenuItem value={"fiction"}>Fiction</MenuItem>
                    <MenuItem value={"nonfiction"}>Non-fiction</MenuItem>
                </Select>
            </FormControl>
          </Grid>
          {currDetails.fictionType !== "" &&
          <Grid item xs={12} sm={6}>
              <GenrePicker fiction={currDetails.fictionType === "fiction"} genres={currDetails.genre} onChange={handleGenreChange}/>
          </Grid>}
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl sx={{m: 1, width: '100%'}} required>
                <InputLabel id="minting-account">
                    Minting Account (Coming soon!)<HelpIcon sx={{cursor: "pointer"}}onClick={handleMintingOpen}/>
                </InputLabel>
                <Select
                    disabled
                    labelId="minting-account"
                    onChange={handleMintingAccountChange}
                    value={currDetails.mintingAccount}
                    id="minting-account"
                    input={<OutlinedInput id="minting-account" label="Minting Account (Coming soon!)??"/>}
                >
                    <MenuItem value={"user"}>Mine</MenuItem>
                    <MenuItem value={"spatium"}>Spatium Publisher</MenuItem>
                </Select>
            </FormControl>
          </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {props.activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                Back
                </Button>
            )}

            <Button
                variant="contained"
                onClick={validateInput}
                sx={{ mt: 3, ml: 1 }}
            >
                {props.activeStep === props.steps.length - 1 ? 'Publish Book' : 'Next'}
            </Button>
        </Box>
        <InformationModal title={"Dragon Protocol"} open={dragonOpen} handleClose={handleDragonClose}>
            <Typography>{dragonText}</Typography>
        </InformationModal>
        <InformationModal title={"Secondary Sales Royalty"} open={secondOpen} handleClose={handleSecondClose}>
            <Typography>{secondText}</Typography>
        </InformationModal>
        <InformationModal title={"Minting Account"} open={mintingOpen} handleClose={handleMintingClose}>
            <Typography>{mintingText}</Typography>
        </InformationModal>
      </React.Fragment>
    );
};

export default RoyaltiesForm;