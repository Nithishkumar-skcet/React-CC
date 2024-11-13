import React, { useState } from 'react'
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

const Forgot = () => {
    const [input, setInput] = useState({ email: '', password: '',confirmpass:'' });
    const [error, setError] = useState({ email: '', password: '',confirmpass:'' });
    const navigate = useNavigate();
    function handleChange(e)
    {
         const {name , value}=e.target;
         setInput(prev =>({...prev,[name]:value}));

    }
    function handleClick()
    {
        const newError = { email: '', password: '', confirmpass: '' };
        let hasError = false;

        if (input.email === '') {
            newError.email = 'Email is required';
            hasError = true;
        } 
        if (input.password === '' || input.confirmpass === '') {
            newError.password = 'Password is required';
            newError.confirmpass = 'Confirm password is required';
            hasError = true;
        } else if (input.password !== input.confirmpass) {
            newError.confirmpass = 'Passwords do not match';
            hasError = true;
        }
        setError(newError);

        if (!hasError) {
            // Check if the email exists in log.json and update the password
            axios.get(`http://localhost:3001/users?email=${input.email}`)
                .then(response => {
                    if (response.data.length > 0) {
                        // Email found, update the password
                        const user = response.data[0]; // Assume user object is found
                        const updatedUser = { ...user, password: input.password };

                        axios.put(`http://localhost:3001/users/${user.id}`, updatedUser)
                            .then(() => {
                                navigate('/login'); // Redirect to login after successful password change
                            })
                            .catch(error => {
                                console.error('Error updating password:', error);
                                alert('Failed to update password');
                            });
                    } else {
                        setError(prev => ({ ...prev, email: 'Email not found' }));
                    }
                })
                .catch(error => {
                    console.error('Error fetching user:', error);
                    alert('Failed to process your request');
                });
        }
    }
  return (
    <div className='container'>
        <h1 className='head' >Change your Password</h1>
        <div className="ip">
        <label for="mail">
            <input type='email' placeholder='Email'
            onChange={handleChange}
            value={input.email}
                            name="email">
            </input>
        </label>
        {error.email && <div className='error'>{error.email}</div> }
        <label for="password">
            <input type='password' placeholder='password'
            onChange={handleChange}
            value={input.password}
                            name="password">
            </input>
        </label>
        {error.password && <div className='error'>{error.password}</div>}
        <label for="conpassword">
            <input type='password' placeholder='confirm password'
            onChange={handleChange}
            value={input.confirmpass}
                            name="confirmpass">
            </input>
        </label>
        {error.confirmpass && <div className='error'>{error.confirmpass}</div>}
        </div>
        <button onClick={handleClick}>Change Password</button>
    </div>
  )
}

export default Forgot