import React, { useState, useEffect } from 'react'
import { Button, TextField, FormLabel, Container } from "@mui/material"

function ManageAccount({handleLogOut, onBackToMain}) {
    const initialForm = {
        username: "",
        password: "",
        verify: ""
    }
    const [form, setForm] = useState(initialForm)
    const [exception, setException] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (form.password === form.verify){
            const updateObj = {username: form.username, password: form.password}
            fetch("/users/1", {
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
            
            //passwords don't match: modal?
        }
    }
    
    const handleDelete  = () => {
        fetch("/users/1", { method: "DELETE" })
        handleLogOut()
    }

    const handleInput = (e) => {
        const {name, value} = e.target
        setForm({...form, [name]: value})
    }

    useEffect(()=> {
        onBackToMain()
      },[])

    return (
        <Container sx={{pt:2}} maxWidth="xs" onChange={handleInput}>
            {exception ?
            <FormLabel>{exception.errors}</FormLabel>
            :<FormLabel>Enter new username and/or password to update</FormLabel>}
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
                sx={{mt:2, mb:5}}
                onClick={handleSubmit}
                >Update user info
            </Button>
            <Button
                fullWidth
                variant="contained"
                onClick={handleDelete}
                color="error"
            >Delete user
            </Button>
        </Container>
    )
}

export default ManageAccount