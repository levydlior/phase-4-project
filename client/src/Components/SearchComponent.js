import React from 'react'
import { Toolbar, Grid, Button, TextField, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


function SearchComponent({ city, setCity, onCitySearch, handleOpen }) {

   const handleChange = (e) => {
       e.preventDefault()
       setCity(e.target.value)
   }

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
          </Grid>
        </Toolbar>
    </Paper>

  )}

export default SearchComponent