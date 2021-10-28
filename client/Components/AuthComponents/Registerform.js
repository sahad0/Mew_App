import React from "react";
import { TextField,Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function Registerform({registerfunction,setName,setEmail,setPass,setRpass,setSecret,name,email,pass,rpass,secret}) {
    return (
        <>
            <form onSubmit={registerfunction}>
                            
                <TextField  label="Name" variant="standard" type="text" className="mt-2 col-sm-12"      onChange={(e)=>{setName(e.target.value)}}    value={name}/>
                <TextField  label="Email" variant="standard" type="text" className="mt-2 col-sm-12"  type="email"    onChange={(e)=>{setEmail(e.target.value)}}   value={email}/>
                <TextField  label="Password" variant="standard" type="text" className="mt-2 col-sm-12"  type="password"    onChange={(e)=>{setPass(e.target.value)}}   value={pass}/>
                <TextField  label="Re-Enter Password" variant="standard" type="text" className="mt-2 col-sm-12"  type="password"    onChange={(e)=>{setRpass(e.target.value)}}   value={rpass}/>
                
                <FormControl variant="standard" sx={{ mt: 5, minWidth: 250 ,}}>
                    <InputLabel id="demo-simple-select-standard-label">Security Question</InputLabel>
                    <Select defaultValue={"What's ur Fav Anime?"}>
                    
                    <MenuItem value={"What's ur Fav Anime?"}>What's ur Fav Anime?</MenuItem>
                    <MenuItem value={"Fav Book?"}>Fav Book?</MenuItem>
                    <MenuItem value={"What's your Surname?"}>What's your Surname?</MenuItem>
                    <MenuItem value={"What's your pet Name?"}>What's your pet Name?</MenuItem>
                    </Select>
                </FormControl>
                <TextField id="standard-basic" label="Security Q&A" variant="standard" type="text" className="mt-2 col-sm-12"      onChange={(e)=>{setSecret(e.target.value)}}   value={secret}/>
                <Button  variant="contained" color="success" type="submit" className="meow mt-3 col-md-12">  Sign Up   </Button>
                        
                        
            </form>
        </>
    );
};

export default Registerform;