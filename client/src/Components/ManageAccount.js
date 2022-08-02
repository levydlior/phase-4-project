import React, { useState } from 'react'
import { Button, CssBaseline, TextField, FormLabel, Grid, Box, Typography, Container } from "@mui/material"

function ManageAccount() {
    const initialForm = {
        username: "",
        password: "",
        verify: ""
    }
    const [form, setForm] = useState(initialForm)
    const [exception, setException] = useState(null)
    //how do we want to display a PATCH error to user?

    const handleSubmit = (e) => {
        e.preventDefault()
        if (form.password === form.verify){
            const updateObj = {username: form.username, password: form.password}
            fetch("/users", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(updateObj)
            }).then(resp => {
                if (resp.ok) {
                    setForm(initialForm)
                    setException(null)
                }
                else {
                    resp.json().then(data => {
                        setException(data)
                    })
                }
            })
        }
        else {
            //passwords don't match
        }
    }

    const handleInput = (e) => {
        const {name, value} = e.target
        setForm({...form, [name]: value})
    }

    return (
        <Container maxWidth="xs" onChange={handleInput}>
            <TextField
                name="username"
                type="text"
                fullWidth
                label="New username"
                value={form.username}
                sx={{mt:3}}
            />
            <TextField
                name="password"
                type="password"
                fullWidth
                label="New password"
                value={form.password}
                sx={{mt:1}}
            />
            <TextField
                name="verify"
                type="password"
                fullWidth
                label="Verify password"
                value={form.verify}
                sx={{mt:1}}
            />

            <Button 
                type="submit" 
                fullWidth
                variant="contained"
                sx={{mt:2}}
                onClick={handleSubmit}
                >Update user info
            </Button>
        </Container>
    )
}

export default ManageAccount