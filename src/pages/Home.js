import React from "react";
import Intro from "../components/Layout/Intro";
import Roadmap from "../components/Roadmap/Roadmap";
import MobileMenu from "../components/Nav/MobileMenu";
import Signup from "../components/Blog/Signup";
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Home = (props) => {
    const showMenu = useSelector(state => state.mobile.showMenu);
    return (
        <Box
          sx={{
            pt: 8,
            pb: 6,
          }}
        >
            <Container maxWidth = "sm">
            {!showMenu && <Intro />}
            {/* {!showMenu && <Roadmap />} */}
            {!showMenu && <Signup/>}
            {showMenu && <MobileMenu />}
        </Container>
        </Box>

    );
};

export default Home;