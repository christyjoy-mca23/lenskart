const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Create the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    //default: 'https://via.placeholder.com/150', // Default profile image
  },
  username:{
    type:String,
   // required:true,
  },
  paymentDetails: [
    {
        phoneNumber: {
    type: String,
    required: true, // Add the phone number field
     },
      totalAmount: {
        type: Number,
        required: true,
      },
      orderDate: {
        type: Date,
        default: Date.now, // Automatically set to the current date
      },
      address: {
        name: { type: String, required: true },
        addressLine: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
      },
      paymentMethod: {
        type: String,
        required: true,
        enum: ['cod', 'upi'], // Define payment methods
      },
    },
  ],
});

// userSchema.pre('save', function (next) {
//   const user = this;
//   if (!user.isModified('password')) {
//     return next();
//   }
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) {
//       return next(err);
//     }
//     bcrypt.hash(user.password, salt, (err, hash) => {
//       if (err) {
//         return next(err);
//       }
//       user.password = hash;
//       next();
//     });
//   });
// });

// userSchema.methods.comparePassword = function (candidatePassword) {
//   const user = this;
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
//       if (err) {
//         return reject(err);
//       }
//       if (!isMatch) {
//         return reject(err);
//       }
//       resolve(true);
//     });
//   });
// };

mongoose.model('User', userSchema);
