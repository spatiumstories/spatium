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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InformationModal from '../UI/InformationModal';
import HelpIcon from '@mui/icons-material/Help';


const mintingText = "MOD stands for Mint On Demand. This means any time someone buys one of your MOD books, a new book is minted for them. Thus creating infinite supply. RARE books are for your limited edition cover releases and have a limited quantity minted."

const NewBookForm = (props) => {
    const [mintingOpen, setMintingOpen] = useState(false);

    const handleMintingClose = () => {
        setMintingOpen(false);
    }

    const handleMintingOpen = () => {
        setMintingOpen(true);
    }


    const [err, setErr] = useState({
        cover: false,
        file: false,
        title: false,
        description: false,
        amount: false,
        quantity: false,
        author: false,
    });

    const [currBook, setCurrBook] = useState({
        cover: "",
        file: "",
        title: "",
        subtitle: "",
        description: "",
        currency: "usd",
        amount: "",
        quantity: "",
        type: "mod",
        author: "",
    });

    const validateInput = () => {
        let errCheck = {
            cover: false,
            file: false,
            title: false,
            description: false,
            amount: false,
            quantity: false,
            author: false,
        };
        let valid = true;
        if (currBook.author === "") {
            errCheck.author = true;
            valid = false;
        }

        if (currBook.cover === "") {
            errCheck.cover = true;
            valid = false;
        }
        if (currBook.file === "") {
            errCheck.file = true;
            valid = false;
        }
        if (currBook.title === "") {
            errCheck.title = true;
            valid = false;
        }
        if (currBook.description === "") {
            errCheck.description = true;
            valid = false;
        }
        if (currBook.amount === "") {
            errCheck.amount = true;
            valid = false;
        }
        if (currBook.quantity === "" && currBook.type === "rare") {
            errCheck.quantity = true;
            valid = false;
        }
        if (valid) {
            props.handleBookChange(currBook);
            props.handleNext();
        } else {
            setErr(errCheck);
        }
    }
    useEffect(() => {
        if (props.book !== null) {
            setCurrBook(props.book);
        }
    }, []);

    const handleAuthorChange = (event) => {
        setErr(oldErr => {
            return {
                ...oldErr,
                author: false,
            }
        });
        setCurrBook(oldBook => {
            return {
                ...oldBook,
                author: event.target.value,
            };
        });
    }

    const handleTitleChange = (event) => {
        setErr(oldErr => {
            return {
                ...oldErr,
                title: false,
            }
        });
        setCurrBook(oldBook => {
            return {
                ...oldBook,
                title: event.target.value,
            };
        });
    }

    const handleSubtitleChange = (event) => {
        setCurrBook(oldBook => {
            return {
                ...oldBook,
                subtitle: event.target.value,
            };
        });
    }

    const handleDescriptionChange = (event) => {
        setErr(oldErr => {
            return {
                ...oldErr,
                description: false,
            }
        });        
        setCurrBook(oldBook => {
            return {
                ...oldBook,
                description: event.target.value,
            };
        });
    }

    const handleTypeChange = (event) => {
        setCurrBook(oldBook => {
            return {
                ...oldBook,
                type: event.target.value
            };
        });
        if (event.target.value === "mod") {
            setErr(oldErr => {
                return {
                    ...oldErr,
                    quantity: false,
                };
            });
        }
    }

    const handleCoverUpload = (event) => {
        console.log(event.target.files[0]);
        setErr(oldErr => {
            return {
                ...oldErr,
                cover: false,
            }
        });
        setCurrBook(oldBook => {
            return {
                ...oldBook,
                cover: event.target.files[0],
            };
        });
    }
    const handleBookUpload = (event) => {
        setErr(oldErr => {
            return {
                ...oldErr,
                file: false,
            }
        });
        setCurrBook(oldBook => {
            return {
                ...oldBook,
                file: event.target.files[0],
            };
        });
    }

    const handleSwitchPayment = (event) => {
        setCurrBook(oldBook => {
            return {
                ...oldBook,
                currency: event.target.checked ? "deso" : "usd",
            };
        });
    }

    const handleAmountChange = (event) => {
        setErr(oldErr => {
            return {
                ...oldErr,
                amount: false,
            }
        });
        setCurrBook(oldBook => {
            return {
                ...oldBook,
                amount: event.target.value,
            };
        });
    }

    const handleQuantityChange = (event) => {
        setErr(oldErr => {
            return {
                ...oldErr,
                quantity: false,
            }
        });
        setCurrBook(oldBook => {
            return {
                ...oldBook,
                quantity: event.target.value,
            };
        });
    }

    return (
        <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Book Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" component="label" endIcon={<PhotoCamera />}>
                 Upload Book Cover
                <input error={err.cover} onChange={handleCoverUpload} hidden accept="image/*" multiple type="file" />
            </Button>
          </Grid>
          {currBook.cover !== "" &&
          <Grid item xs={12} sm={6}>
              <Typography>{currBook.cover.name}</Typography>
          </Grid>
          }
          <Grid item xs={12} sm={6}>
            <Button variant="contained" component="label" endIcon={<BookIcon />}>
                 Upload Book File
                <input error={err.file} onChange={handleBookUpload} hidden accept="*/*" multiple type="file" />
            </Button>
          </Grid>   
          <Grid item xs={12} sm={6}>
              <Typography>{currBook.file.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="title"
              name="title"
              label="Title"
              value={currBook.title}
              fullWidth
              error={err.title}
              onChange={handleTitleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="author"
              name="author"
              label="Author"
              value={currBook.author}
              fullWidth
              error={err.author}
              onChange={handleAuthorChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="subtitle"
              name="subtitle"
              label="Subtitle"
              value={currBook.subtitle}
              fullWidth
              onChange={handleSubtitleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    type="text"
                    multiline="true"
                    minRows="4"
                    id="description"
                    value={currBook.description}
                    error={err.description}
                    onChange={handleDescriptionChange}
                    />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Stack direction="row" spacing={0.25} alignItems="center" justifyContent="center">
                <Typography align="center">USD</Typography>
                {currBook.currency === "deso" && <Switch defaultChecked onChange={handleSwitchPayment} color="secondary" />}
                {currBook.currency === "usd" && <Switch onChange={handleSwitchPayment} color="secondary" />}
                <Typography align="center">Deso</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">{currBook.currency === "deso" ? '$DESO' : '$'}</InputAdornment>}
                label="Amount"
                value={currBook.amount}
                onChange={handleAmountChange}
                error={err.amount}
                type="number"
            />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <InputLabel id="minting-type">
                    Minting Type <HelpIcon sx={{cursor: "pointer"}}onClick={handleMintingOpen}/>
                </InputLabel>
                <Select
                    required
                    id="minting-type"
                    onChange={handleTypeChange}
                    value={currBook.type}
                    input={<OutlinedInput id="minting-type" label="Minting Type ??"/>}
                >
                    <MenuItem value={"mod"}>MOD</MenuItem>
                    <MenuItem value={"rare"}>RARE</MenuItem>
                </Select>
            </FormControl>
          </Grid>
          {currBook.type === "rare" &&
            <Grid item xs={12} sm={6}>
                <TextField
                required
                id="quantity"
                name="quantity"
                label="Quantity"
                value={currBook.quantity}
                onChange={handleQuantityChange}
                error={err.quantity}
                fullWidth
                type="number"
                />
            </Grid>
        }
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {props.activeStep !== 0 && (
                <Button onClick={props.handleBack} sx={{ mt: 3, ml: 1 }}>
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
        <InformationModal title={"MOD vs RARE"} open={mintingOpen} handleClose={handleMintingClose}>
            <Typography>{mintingText}</Typography>
        </InformationModal>
      </React.Fragment>
    );
};

export default NewBookForm;