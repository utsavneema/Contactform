import React, { useState } from 'react';
import axios from 'axios';

const DeleteUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelete = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMobile = mobile.trim();

    if (trimmedName === '' && trimmedEmail === '' && trimmedMobile === '') {
      setErrorMessage('Please enter at least one field to delete the user.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/check-user', {
        name: trimmedName,
        email: trimmedEmail,
        mobile: trimmedMobile,
      });

      const userExists = response.data.exists;

      if (userExists) {
        // User exists, proceed with deletion
        const deleteResponse = await axios.post('http://localhost:8000/delete-user', {
          name: trimmedName,
          email: trimmedEmail,
          mobile: trimmedMobile,
        });

        console.log(deleteResponse);
        alert('User deleted successfully!');

        // Reset the fields to empty
        setName('');
        setEmail('');
        setMobile('');
      } else {
        // User does not exist, show error message
        setErrorMessage('User does not exist.');
      }
    } catch (error) {
      console.log(error);
      alert('Failed to delete user.');
    }
  };

  return (
    <div>
      <h3>Delete User</h3>

      <div> <label>Name:</label> <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> </div>

      <div> <label>Email:</label> <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
      
      <div> <label>Mobile:</label> <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} /> </div>
      
      <button type="button" onClick={handleDelete}> Delete </button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};
export default DeleteUser;