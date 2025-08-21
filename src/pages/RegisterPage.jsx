import React, { useState } from 'react';
import {
  FaUser, FaEnvelope, FaLock, FaCalendarAlt, FaMapMarkerAlt, FaPhone,
  FaPlusCircle, FaMinusCircle
} from 'react-icons/fa';

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    occupation: '',
    profilePictureUrl: '',
    addresses: [{
      type: 'LOCAL',
      street: '',
      suburb: '',
      city: '',
      state: '',
      country: 'Australia',
      primary: true
    }],
    contacts: [{
      type: 'LOCAL_PHONE',
      value: '',
      method: 'PHONE',
      primary: true
    }],
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [globalError, setGlobalError] = useState('');

  const addressTypes = ['LOCAL', 'OVERSEAS', 'MAILING'];
  const contactTypes = ['LOCAL_PHONE', 'OVERSEAS_PHONE', 'EMAIL', 'WHATSAPP'];
  const contactMethods = ['PHONE', 'EMAIL', 'MESSAGING_APP'];
  const countries = ['Australia', 'USA', 'Canada', 'UK', 'New Zealand', 'India'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const handleAddressChange = (index, e) => {
    const { name, value, checked } = e.target;
    const newAddresses = [...formData.addresses];
    if (name === 'primary') {
      newAddresses.forEach((addr, i) => {
        addr.primary = (i === index) ? checked : false;
      });
    } else {
      newAddresses[index][name] = value;
    }
    setFormData({ ...formData, addresses: newAddresses });
    setFormErrors({ ...formErrors, addresses: '' });
  };

  const handleAddAddress = () => {
    setFormData({
      ...formData,
      addresses: [
        ...formData.addresses,
        {
          type: 'LOCAL',
          street: '',
          suburb: '',
          city: '',
          state: '',
          country: 'Australia',
          primary: false
        }
      ]
    });
  };

  const handleRemoveAddress = (index) => {
    const newAddresses = formData.addresses.filter((_, i) => i !== index);
    if (newAddresses.length > 0 && !newAddresses.some(addr => addr.primary)) {
      newAddresses[0].primary = true;
    }
    setFormData({ ...formData, addresses: newAddresses });
  };

  const handleContactChange = (index, e) => {
    const { name, value, checked } = e.target;
    const newContacts = [...formData.contacts];
    if (name === 'primary') {
      newContacts.forEach((contact, i) => {
        contact.primary = (i === index) ? checked : false;
      });
    } else {
      newContacts[index][name] = value;
    }
    setFormData({ ...formData, contacts: newContacts });
    setFormErrors({ ...formErrors, contacts: '' });
  };

  const handleAddContact = () => {
    setFormData({
      ...formData,
      contacts: [
        ...formData.contacts,
        { type: 'LOCAL_PHONE', value: '', method: 'PHONE', primary: false }
      ]
    });
  };

  const handleRemoveContact = (index) => {
    const newContacts = formData.contacts.filter((_, i) => i !== index);
    if (newContacts.length > 0 && !newContacts.some(contact => contact.primary)) {
      newContacts[0].primary = true;
    }
    setFormData({ ...formData, contacts: newContacts });
  };

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.firstName) errors.firstName = 'First name is required.';
    else if (formData.firstName.length < 2 || formData.firstName.length > 50)
      errors.firstName = 'First name must be between 2 and 50 characters.';

    if (!formData.lastName) errors.lastName = 'Last name is required.';
    else if (formData.lastName.length < 2 || formData.lastName.length > 50)
      errors.lastName = 'Last name must be between 2 and 50 characters.';

    if (!formData.email) errors.email = 'Email is required.';
    else if (!emailRegex.test(formData.email)) errors.email = 'Email should be valid.';
    else if (formData.email.length > 100)
      errors.email = 'Email cannot exceed 100 characters.';

    if (!formData.password) errors.password = 'Password is required.';
    else if (!passwordRegex.test(formData.password))
      errors.password =
        'Password must be at least 8 characters, include uppercase, lowercase, number, and special character.';

    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = 'Passwords do not match.';

    if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of Birth is required.';
    else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      if (dob > today) errors.dateOfBirth = 'Date of Birth cannot be in the future.';
    }

    if (formData.addresses.length === 0) {
      errors.addresses = 'At least one address is required.';
    } else {
      formData.addresses.forEach((addr, index) => {
        if (!addr.street) errors[`addressStreet${index}`] = 'Street is required.';
        if (!addr.suburb) errors[`addressSuburb${index}`] = 'Suburb is required.';
        if (!addr.city) errors[`addressCity${index}`] = 'City is required.';
        if (!addr.state) errors[`addressState${index}`] = 'State is required.';
        if (!addr.country) errors[`addressCountry${index}`] = 'Country is required.';
      });
      if (!formData.addresses.some(addr => addr.primary)) {
        errors.addresses = 'One address must be marked as primary.';
      }
    }

    if (formData.contacts.length === 0) {
      errors.contacts = 'At least one contact is required.';
    } else {
      formData.contacts.forEach((contact, index) => {
        if (!contact.value) errors[`contactValue${index}`] = 'Contact value is required.';
      });
      if (!formData.contacts.some(contact => contact.primary)) {
        errors.contacts = 'One contact must be marked as primary.';
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(false);
    setGlobalError('');
    if (!validateForm()) {
      setGlobalError('Please correct the errors in the form.');
      return;
    }
    const dataToSend = { ...formData };
    delete dataToSend.confirmPassword;
    try {
      const response = await fetch('http://localhost:8082/api/v1/members/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        const result = await response.json();
        setIsSubmitted(true);
        setFormData({
          firstName: '', lastName: '', email: '', password: '', confirmPassword: '', dateOfBirth: '',
          occupation: '', profilePictureUrl: '',
          addresses: [{
            type: 'LOCAL', street: '', suburb: '', city: '', state: '', country: 'Australia', primary: true
          }],
          contacts: [{
            type: 'LOCAL_PHONE', value: '', method: 'PHONE', primary: true
          }],
        });
      } else {
        const errorData = await response.json();
        setGlobalError(errorData.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setGlobalError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 drop-shadow-lg">
            Join Our Community
          </h1>
          <p className="text-xl text-gray-700">
            Create your account and start connecting today!
          </p>
        </div>
        {isSubmitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline ml-2">Your registration was successful. Welcome to the community!</span>
          </div>
        )}
        {globalError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{globalError}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-lg font-medium text-gray-700 mb-2">First Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`pl-10 mt-1 block w-full px-4 py-3 border ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 text-lg`}
                  placeholder="Nikhlanshu"
                />
              </div>
              {formErrors.firstName && <p className="mt-2 text-sm text-red-600">{formErrors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-lg font-medium text-gray-700 mb-2">Last Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`pl-10 mt-1 block w-full px-4 py-3 border ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 text-lg`}
                  placeholder="Jena"
                />
              </div>
              {formErrors.lastName && <p className="mt-2 text-sm text-red-600">{formErrors.lastName}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`pl-10 mt-1 block w-full px-4 py-3 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 text-lg`}
                placeholder="Nikhlanshu.Jena@example.com"
              />
            </div>
            {formErrors.email && <p className="mt-2 text-sm text-red-600">{formErrors.email}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`pl-10 mt-1 block w-full px-4 py-3 border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 text-lg`}
                  placeholder="********"
                />
              </div>
              {formErrors.password && <p className="mt-2 text-sm text-red-600">{formErrors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`pl-10 mt-1 block w-full px-4 py-3 border ${formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 text-lg`}
                  placeholder="********"
                />
              </div>
              {formErrors.confirmPassword && <p className="mt-2 text-sm text-red-600">{formErrors.confirmPassword}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="dateOfBirth" className="block text-lg font-medium text-gray-700 mb-2">Date of Birth</label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={`pl-10 mt-1 block w-full px-4 py-3 border ${formErrors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 text-lg`}
              />
            </div>
            {formErrors.dateOfBirth && <p className="mt-2 text-sm text-red-600">{formErrors.dateOfBirth}</p>}
          </div>
          {/* Addresses Section */}
          <div className="border-t-2 border-indigo-200 pt-8 mt-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <FaMapMarkerAlt className="text-indigo-600 mr-3" /> Address Information
            </h3>
            {formErrors.addresses && <p className="mt-2 mb-4 text-sm text-red-600">{formErrors.addresses}</p>}
            {formData.addresses.map((address, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-md mb-6 relative">
                <h4 className="text-xl font-semibold text-gray-700 mb-4">Address #{index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`addressType${index}`} className="block text-base font-medium text-gray-700 mb-1">Type</label>
                    <select
                      name="type"
                      id={`addressType${index}`}
                      value={address.type}
                      onChange={(e) => handleAddressChange(index, e)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
                    >
                      {addressTypes.map(type => (
                        <option key={type} value={type}>{type.replace('_', ' ').toLowerCase().replace(/\b\w/g, s => s.toUpperCase())}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`addressStreet${index}`} className="block text-base font-medium text-gray-700 mb-1">Street</label>
                    <input
                      type="text"
                      name="street"
                      id={`addressStreet${index}`}
                      value={address.street}
                      onChange={(e) => handleAddressChange(index, e)}
                      className={`mt-1 block w-full px-3 py-2 border ${formErrors[`addressStreet${index}`] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base`}
                      placeholder="123 Main St"
                    />
                    {formErrors[`addressStreet${index}`] && <p className="mt-1 text-xs text-red-600">{formErrors[`addressStreet${index}`]}</p>}
                  </div>
                  <div>
                    <label htmlFor={`addressSuburb${index}`} className="block text-base font-medium text-gray-700 mb-1">Suburb</label>
                    <input
                      type="text"
                      name="suburb"
                      id={`addressSuburb${index}`}
                      value={address.suburb}
                      onChange={(e) => handleAddressChange(index, e)}
                      className={`mt-1 block w-full px-3 py-2 border ${formErrors[`addressSuburb${index}`] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base`}
                      placeholder="Chatswood"
                    />
                    {formErrors[`addressSuburb${index}`] && <p className="mt-1 text-xs text-red-600">{formErrors[`addressSuburb${index}`]}</p>}
                  </div>
                  <div>
                    <label htmlFor={`addressCity${index}`} className="block text-base font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      id={`addressCity${index}`}
                      value={address.city}
                      onChange={(e) => handleAddressChange(index, e)}
                      className={`mt-1 block w-full px-3 py-2 border ${formErrors[`addressCity${index}`] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base`}
                      placeholder="Sydney"
                    />
                    {formErrors[`addressCity${index}`] && <p className="mt-1 text-xs text-red-600">{formErrors[`addressCity${index}`]}</p>}
                  </div>
                  <div>
                    <label htmlFor={`addressState${index}`} className="block text-base font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      id={`addressState${index}`}
                      value={address.state}
                      onChange={(e) => handleAddressChange(index, e)}
                      className={`mt-1 block w-full px-3 py-2 border ${formErrors[`addressState${index}`] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base`}
                      placeholder="NSW"
                    />
                    {formErrors[`addressState${index}`] && <p className="mt-1 text-xs text-red-600">{formErrors[`addressState${index}`]}</p>}
                  </div>
                  <div>
                    <label htmlFor={`addressCountry${index}`} className="block text-base font-medium text-gray-700 mb-1">Country</label>
                    <select
                      name="country"
                      id={`addressCountry${index}`}
                      value={address.country}
                      onChange={(e) => handleAddressChange(index, e)}
                      className={`mt-1 block w-full px-3 py-2 border ${formErrors[`addressCountry${index}`] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base`}
                    >
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    {formErrors[`addressCountry${index}`] && <p className="mt-1 text-xs text-red-600">{formErrors[`addressCountry${index}`]}</p>}
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <input
                    id={`primaryAddress${index}`}
                    name="primary"
                    type="checkbox"
                    checked={address.primary}
                    onChange={(e) => handleAddressChange(index, e)}
                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`primaryAddress${index}`} className="ml-2 block text-base text-gray-900">
                    Primary Address
                  </label>
                </div>
                {formData.addresses.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveAddress(index)}
                    className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition duration-300"
                    title="Remove address"
                  >
                    <FaMinusCircle className="text-2xl" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddAddress}
              className="mt-4 flex items-center px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300"
            >
              <FaPlusCircle className="mr-2" /> Add Another Address
            </button>
          </div>
          {/* Contacts Section */}
          <div className="border-t-2 border-indigo-200 pt-8 mt-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <FaPhone className="text-indigo-600 mr-3" /> Contact Information
            </h3>
            {formErrors.contacts && <p className="mt-2 mb-4 text-sm text-red-600">{formErrors.contacts}</p>}
            {formData.contacts.map((contact, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-md mb-6 relative">
                <h4 className="text-xl font-semibold text-gray-700 mb-4">Contact #{index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`contactType${index}`} className="block text-base font-medium text-gray-700 mb-1">Type</label>
                    <select
                      name="type"
                      id={`contactType${index}`}
                      value={contact.type}
                      onChange={(e) => handleContactChange(index, e)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
                    >
                      {contactTypes.map(type => (
                        <option key={type} value={type}>{type.replace('_', ' ').toLowerCase().replace(/\b\w/g, s => s.toUpperCase())}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`contactMethod${index}`} className="block text-base font-medium text-gray-700 mb-1">Method</label>
                    <select
                      name="method"
                      id={`contactMethod${index}`}
                      value={contact.method}
                      onChange={(e) => handleContactChange(index, e)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
                    >
                      {contactMethods.map(method => (
                        <option key={method} value={method}>{method.replace('_', ' ').toLowerCase().replace(/\b\w/g, s => s.toUpperCase())}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor={`contactValue${index}`} className="block text-base font-medium text-gray-700 mb-1">Value</label>
                    <input
                      type="text"
                      name="value"
                      id={`contactValue${index}`}
                      value={contact.value}
                      onChange={(e) => handleContactChange(index, e)}
                      className={`mt-1 block w-full px-3 py-2 border ${formErrors[`contactValue${index}`] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base`}
                      placeholder={contact.method === 'EMAIL' ? 'email@example.com' : '0412 345 678'}
                    />
                    {formErrors[`contactValue${index}`] && <p className="mt-1 text-xs text-red-600">{formErrors[`contactValue${index}`]}</p>}
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <input
                    id={`primaryContact${index}`}
                    name="primary"
                    type="checkbox"
                    checked={contact.primary}
                    onChange={(e) => handleContactChange(index, e)}
                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`primaryContact${index}`} className="ml-2 block text-base text-gray-900">
                    Primary Contact
                  </label>
                </div>
                {formData.contacts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveContact(index)}
                    className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition duration-300"
                    title="Remove contact"
                  >
                    <FaMinusCircle className="text-2xl" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddContact}
              className="mt-4 flex items-center px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300"
            >
              <FaPlusCircle className="mr-2" /> Add Another Contact
            </button>
          </div>
          {/* Optional Fields */}
          <div className="border-t-2 border-indigo-200 pt-8 mt-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <FaUser className="text-indigo-600 mr-3" /> Additional Details (Optional)
            </h3>
            <div>
              <label htmlFor="occupation" className="block text-lg font-medium text-gray-700 mb-2">Occupation</label>
              <input
                type="text"
                name="occupation"
                id="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 text-lg"
                placeholder="e.g., Software Engineer"
              />
            </div>
            <div className="mt-6">
              <label htmlFor="profilePictureUrl" className="block text-lg font-medium text-gray-700 mb-2">Profile Picture URL</label>
              <input
                type="url"
                name="profilePictureUrl"
                id="profilePictureUrl"
                value={formData.profilePictureUrl}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 text-lg"
                placeholder="https://example.com/your-photo.jpg"
              />
            </div>
          </div>
          {/* Submit Button */}
          <div className="pt-8">
            <button
              type="submit"
              className="w-full inline-flex justify-center py-4 px-6 border border-transparent rounded-lg shadow-xl text-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 transform hover:scale-105"
            >
              Register Now!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
