import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loaduser } from  '../../../features/user/userThunks';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button,
  Divider
} from '@mui/material';

const UserDetails = () => {
  const dispatch = useDispatch();
  const { user, loading, error, deliveryAddress } = useSelector((state) => state.user);
  
  console.log(user[0]);
  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const calculateAccountAge = () => {
    const createdDate = new Date(user[0].createdAt);
    const currentDate = new Date();
  
    let years = currentDate.getFullYear() - createdDate.getFullYear();
    let months = currentDate.getMonth() - createdDate.getMonth();
    let days = currentDate.getDate() - createdDate.getDate();
  
    if (days < 0) {
      months--;
      days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    }
  
    if (months < 0) {
      years--;
      months += 12;
    }
  
    return { years, months, days };
  };
  const accountAge = user[0] ? calculateAccountAge(user[0].createdAt) : null;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>My Details</Typography>
      <Paper className="p-4">
        <Typography variant="h6">Full Name: {user[0].fullname}</Typography>
        <Typography variant="h6">Email: {user[0].email}</Typography>
        {accountAge && (
            <Typography variant="h6">
              Account Age: {accountAge.years} years, {accountAge.months} months, {accountAge.days} days
            </Typography>
          )}
        <Button variant="contained" color="primary" className="mt-4">Save Details</Button>
      </Paper>
      {deliveryAddress.length > 0 && (
        <Paper className="p-4 mb-4">
          <Typography variant="h5" gutterBottom>Delivery Address</Typography>
          {deliveryAddress.map((address) => (
            <Box key={address.id} mb={2}>
              <Typography variant="h6">Full Name: {address.fullname}</Typography>
              <Typography variant="h6">Mobile Number: {address.mobile_number}</Typography>
              <Typography variant="h6">Address: {address.address}</Typography>
              <Typography variant="h6">City: {address.city}</Typography>
              <Typography variant="h6">State: {address.state}</Typography>
              <Typography variant="h6">Pincode: {address.pincode}</Typography>
              <Typography variant="h6">Created At: {new Date(address.created_at).toLocaleString()}</Typography>
              <Divider className="my-2" />
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  );
};

export default UserDetails;
