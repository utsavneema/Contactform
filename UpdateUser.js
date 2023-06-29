import React, { useState } from 'react';

const UpdateUser = ({ updateUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleUpdate = () => {
    const updatedUser = {
      name: name,
      email: email,
      mobile: mobile,
    };
    updateUser(updatedUser);
    setName('');
    setEmail('');
    setMobile('');
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="update-name">Name</label>
        <input type="text"id="update-name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="update-email">Email</label>
        <input type="email" id="update-email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="update-mobile">Mobile</label>
        <input type="text" id="update-mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
      </div>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateUser;