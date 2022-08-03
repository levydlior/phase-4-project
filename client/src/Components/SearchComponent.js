import React from 'react'
import { Toolbar, Grid, Button, TextField, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {IconButton} from "@mui/material";
import MyLocationIcon from '@mui/icons-material/MyLocation';


function SearchComponent({ city, setCity, onCitySearch}) {

   const handleChange = (e) => {
       e.preventDefault()
       setCity(e.target.value)
   }

   const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        console.log({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <Paper sx={{ maxWidth: 700, margin: 'auto', overflow: 'hidden' }}>
        <Toolbar type="form" >
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: 'block' }} />
            </Grid>
          <Grid item xs>
            <TextField
                fullWidth
                value={city}
                placeholder="Search by city or ZIP code"
                onChange={handleChange}
                InputProps={{
                disableUnderline: true,
                sx: { fontSize: 'default' },
                }}
                variant="standard"
            />
          </Grid>
            <Grid item>
              <Button onClick={onCitySearch} variant="contained" sx={{ mr: 1 }}>
                Search
              </Button>
            </Grid>
            <Grid item>
            <IconButton onClick={handleLocationClick}  aria-label="settings">
                <MyLocationIcon sx={{ color: "gray" }}/>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
    </Paper>

  )}

export default SearchComponent