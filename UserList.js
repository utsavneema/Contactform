import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get-users');
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
    setName(user.name);
    setEmail(user.email);
    setMobile(user.mobile);
    setErrorMessage('');
  };

  const handleUpdate = async () => {
    const validateFields = () => {
      if (name.trim() === '') {
        setErrorMessage('Username cannot be blank.');
        return false;
      } else if (!validateEmail(email)) {
        setErrorMessage('Please enter a valid email address.');
        return false;
      } else if (!validateMobile(mobile)) {
        setErrorMessage('Please enter a valid mobile number.');
        return false;
      }
      return true;
    };

    if (!validateFields()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/update-user', {
        id: selectedUser.id,
        name: name,
        email: email,
        mobile: mobile,
      });
      console.log(response);
      alert('update hogya!');
      fetchUsers();
      resetForm();
    } catch (error) {
      console.log(error);
      alert('update nahi hua');
    }
  };

  const resetForm = () => {
    setSelectedUser(null);
    setIsEditing(false);
    setName('');
    setEmail('');
    setMobile('');
    setErrorMessage('');
  };

  return (
    <div>
      <h2>User List</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>Name:</strong> {user.name}, <strong>Email:</strong> {user.email}, <strong>Mobile:</strong> {user.mobile}
              <button type="button" onClick={() => handleEdit(user)}>
                Edit
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}

      {isEditing && selectedUser && (
        <div>
          <h3>Edit User</h3>
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <input type="text" value={mobile} onChange={(event) => setMobile(event.target.value)} />
          <button type="button" onClick={handleUpdate}>
            Update
          </button>
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      )}
    </div>
  );
};export default UserList;