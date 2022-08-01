import React, {useState} from "react";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { CardHeader } from "@mui/material";
import { CardContent } from "@mui/material";
import Container from "@mui/material/Container";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function ModalComponenet({ cityWeather, handleClose, open}) {
    const { dt, timezone, weather, main, wind, sys, name } = cityWeather


    const date1= new Date(dt*1000+(timezone*1000)).toLocaleDateString();


    return (
        <Modal 
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
        }}>
            <Fade in={open}>
                <Card
                sx={style}
                >
                <CardHeader
                    subheader={date1}
                />
                <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Box p={1}>
                    <Typography variant="h4" color="textPrimary">
                        {name}, {sys.country}
                    </Typography>
                    </Box>
                    <Box p={1}>
                    <Typography variant="h2" color="textPrimary">
                        {main.temp}
                        <span>&#176;</span>
                        {"F"}
                    </Typography>
                    </Box>
                    <Box p={1}>
                    <Typography variant="h5" color="textPrimary">
                    {weather[0].main}
                    </Typography>
                    </Box>
                    <Box p={1}>
                    <Typography variant="h5" color="textPrimary">
                    H:{main.temp_max}<span>&#176;</span> L:{main.temp_min}<span>&#176;</span>
                    </Typography>
                    </Box>
                    <Box p={1}>
                    <Typography variant="h7" color="textPrimary">
                        Humidity: {main.humidity} %
                    </Typography>
                    </Box>
                    <Box p={1}>
                    <Typography variant="h7" color="textPrimary">
                        pressure: {main.pressure} pa
                    </Typography>
                    </Box>
                    <Box p={1}>
                    <Typography variant="h7" color="textPrimary">
                        wind: {wind.speed} mp/h
                    </Typography>
                    </Box>
                </CardContent>
             </Card>
        </Fade>
    </Modal>

    )
}

export default ModalComponenet;