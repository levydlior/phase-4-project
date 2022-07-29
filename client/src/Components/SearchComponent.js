import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';



function SearchComponent( {setCity, onCitySearch}) {

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
                placeholder="Search by city or zip code"
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