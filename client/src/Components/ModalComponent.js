import React, { useState } from "react";
import { Backdrop, Modal, Fade, Box, Typography, Card, CardHeader, CardContent, Container, Avatar } from '@mui/material';
import FiveDaysWeather from "./FiveDaysWeather";

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
            <Container component="main" maxWidth="sm">
                <Card
                sx={style}
                >
                <CardHeader
                    subheader={date1}
                />
                <CardContent 
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                    >
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
                    <Box p={1}>
                    <img
                        src= {`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                        alt=""
                    />
                    </Box>
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
                    <FiveDaysWeather cityName={name}/>
                </CardContent>
             </Card>
             </Container>
        </Fade>
    </Modal>

    )
}

export default ModalComponenet;