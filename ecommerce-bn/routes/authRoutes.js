const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey}= require('../keys')
const router = express.Router()
const User = mongoose.model('User');
const bcrypt = require('bcrypt')
const multer = require('multer');
const path = require('path');

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  console.log('Signup Request Body:', req.body); // Log incoming request body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', existingUser); // Log existing user
      return res.status(400).json({ error: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword); // Log the hashed password

    const user = new User({ email, password: hashedPassword });
    await user.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Signin Route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  console.log('Signin Request Body:', req.body); // Log incoming request body

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found for email:', email); // Log user not found
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    console.log('Stored Password Hash:', user.password); // Log stored password hash
    const isMatch = await bcrypt.compare(password, user.password);

    // Log specific information about the password match attempt
    if (!isMatch) {
      console.log('Password mismatch for email:', email); // Log password mismatch
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, jwtkey, {
      expiresIn: '1h',
    });

    res.json({ token, userId: user._id }); // Return user ID along with the token
  } catch (err) {
    console.error('Error during sign-in:', err); // Log error
    res.status(500).json({ error: 'Server error' });
  }
});


  
router.post('/pay', async (req, res) => {
  
    const { userid, phoneNumber, totalAmount, address, paymentMethod } = req.body;
  
    // Ensure all required fields are present
    if (!userid || !phoneNumber || !totalAmount || !address || !paymentMethod) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
  
    // You might want to check for specific fields within the address object too
    if (!address.name || !address.addressLine || !address.city || !address.state || !address.zip) {
      return res.status(400).json({ success: false, message: "Address fields are required." });
    }
  
const name=address.name
const addressLine=address.addressLine
const city=address.city
const state=address.state
const zip=address.zip
  try {
      
      const user = await User.findById(userid);
      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found.' });
      }
console.log(address.name)
      user.paymentDetails.push({
          phoneNumber,
          totalAmount,
          address: {
              name,
              addressLine,
              city,
              state,
              zip,
          },
          paymentMethod,
      });

      await user.save();

      return res.status(200).json({ success: true, message: 'Payment details saved successfully.' });
  } catch (error) {
      console.error('Error saving payment details:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});
router.get('/profile/:userId', async (req, res) => {
  const userId = req.params.userId;
  console.log(userId)
  try {
    const user = await User.findById(userId).select('-password'); // Exclude password from response
    if (!user) return res.sendStatus(404); // User not found
    res.json(user);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// router.put('/updateProfile',  async (req, res) => {
//   const { name, email } = req.body;
//   const userId = req.user.id; // Assuming you're storing user ID in req.user

//   // Validate inputs here (optional)

//   try {
//     // Update user in the database
//     await UserModel.findByIdAndUpdate(userId, { name, email });
//     res.status(200).json({ message: 'Profile updated successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update profile' });
//   }
// });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Update profile
router.put('/updateProfile/:userId', upload.single('profileImage'), async (req, res) => {
  const { userId } = req.params;
  const { name, email } = req.body;
  let profileImage;

  if (req.file) {
    profileImage = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  }

  try {
    // Check if userId is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Check if all required fields are provided
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const updatedData = {
      username: name,
      email,
      ...(profileImage && { profileImage }),
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    // Check if the user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error); // Log the actual error for debugging
    res.status(500).json({ error: 'Failed to update profile. Server error.' });
  }
});

  
module.exports = router
