import React, { useState } from 'react';
import axios from 'axios';
import './contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  };

  const addItem = async () => {
    if (name.trim() === '') {
      setErrorMessage('Username cannot be blank.');
      return;
    } else if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    } else if (!validateMobile(mobile)) {
      setErrorMessage('Please enter a valid mobile number.');
      return;
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: name,
        email: email,
        mobile: mobile,
      };
      setItems([...items, myNewInputData]);
      setName('');
      setMobile('');
      setEmail('');
      setErrorMessage('');

      try {
        const response = await axios.post('http://localhost:8000/create-user', {
          name: name,
          email: email,
          mobile: mobile,
        });
        console.log(response);
        alert('data gaya');
      } catch (error) {
        console.log(error);
        alert('data nahi gaya');
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (isEditing) {
        updateItem();
      } else {
        addItem();
      }
    }
  };

  const editItem = (id) => {
    const selectedItem = items.find((curElem) => curElem.id === id);
    setSelectedItem(selectedItem);
    setIsEditing(true);
    setName(selectedItem.name);
    setEmail(selectedItem.email);
    setMobile(selectedItem.mobile);
  };

  const updateItem = async () => {
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

    const updatedItems = items.map((curElem) => {
      if (curElem.id === selectedItem.id) {
        return {
          ...curElem,
          name: name,
          email: email,
          mobile: mobile,
        };
      }
      return curElem;
    });

    setItems(updatedItems);
    setSelectedItem(null);
    setIsEditing(false);
    setName('');
    setEmail('');
    setMobile('');
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:8000/update-user', {
        id: selectedItem.id,
        name: name,
        email: email,
        mobile: mobile,
      });
      console.log(response);
      alert('data update hogya');
    } catch (error) {
      console.log(error);
      alert('data update nahi hua');
    }
  };

  return (
    <div className="main_div">
      <div className="child_div">
        <h1 className="heading">Contact Form</h1>
        <h3 className="heading">Please Enter the following details</h3>
        <div className="addItems">

          <input type="text" placeholder="Name" className="inputname" value={name} onChange={(event) => setName(event.target.value)} 
            onKeyDown={handleKeyPress} />
          
          <input type="email" placeholder="Email" className="inputemail" value={email} onChange={(event) => setEmail(event.target.value)}
            onKeyDown={handleKeyPress} />
          
          <input type="text" placeholder="Mobile No" className="inputmobileno" value={mobile} onChange={(event) => setMobile(event.target.value)}
            onKeyDown={handleKeyPress} />
          
          <input type="submit" value={isEditing ? 'Update' : 'Submit'} className="inputsubmit" onClick={isEditing ? updateItem : addItem}/>

        </div>
        {<p className="error-message">{errorMessage}</p>}
        <div className="showItems">
          {items.map((curElem) => (
            <div className="eachItem" key={curElem.id}>
              <span>Name: {curElem.name}</span>
              <span>Email: {curElem.email}</span>
              <span>Mobile: {curElem.mobile}</span>
              <div className="contact-btn">
                <button type="button" onClick={() => editItem(curElem.id)}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};export default Contact;