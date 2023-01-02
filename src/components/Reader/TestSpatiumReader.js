import React, { useRef, useState, useEffect } from "react"
import { ReactReader } from "react-reader"
import { useParams } from "react-router";
import Button from '@mui/material/Button';
import {isMobile} from 'react-device-detect';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import Deso from 'deso-protocol';
import { useSelector, useDispatch } from "react-redux";
import { userActions } from '../../store/user-slice';
import LoginIcon from '@mui/icons-material/Login';
import { useLocation } from "react-router";








const TestSpatiumReader = (props) => {
    // // const { book } = useParams();
    // const stateLocation = useLocation();
    // console.log(stateLocation);
    // const book = stateLocation.state.book;
    const book = props.book;
    const [page, setPage] = useState('')




  const getReader = () => {
      if (isMobile) {
        return (
            <ReactReader
            url={book}
            epubInitOptions={{
              openAs: 'epub'
            }}
            epubOptions={{
              flow: "scrolled",
              manager: "continuous"
            }}
          />
        );
      } else {
          return (
            <ReactReader
            url={book}
            epubInitOptions={{
              openAs: 'epub'
            }}
          />
          );
      }
  }


  return (
    <>
        <div style={{ height: "100vh", width: "100%"}}>
          {getReader()}
          {!isMobile && 
              <div style={{position: 'absolute', bottom: '1rem', right: '1rem', left: '1rem', textAlign: 'center', zIndex: 1}}>
                  {page}
              </div>
          }  
        </div>
    </>
  )
};

export default TestSpatiumReader;