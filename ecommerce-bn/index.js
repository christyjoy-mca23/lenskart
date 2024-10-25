const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
//const User = mongoose.model('User');
const app = express()
const PORT = 3000
const {mogoUrl} = require('./keys')
//const authenticateUser = require('./routes/auth');
const multer = require('multer');
const path = require('path');
const User = require('./models/User'); // Adjust the path as necessary

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images

// Configure Multer for image upload



 require('./models/User');
require('./models/Product')

const requireToken = require('./middleware/requireToken')
const authRoutes = require('./routes/authRoutes')
app.use(bodyParser.json())
app.use(authRoutes)


mongoose.connect(mogoUrl)

mongoose.connection.on('connected',()=>{
    console.log("connected to mongoDB")
})
mongoose.connection.on('error',(err)=>{
    console.log("this is error",err)
})

app.get('/',requireToken,(req,res)=>{
    res.send("your email is "+ req.user.email)
})
const Product = mongoose.model('Product');
app.post('/products', async (req, res) => {
    const { name, description, price, ingredients, benefits, image } = req.body;
    const product = new Product({ name, description, price, ingredients, benefits, image });
    await product.save();
    res.status(201).json(product);
  });
  
  app.get('/api/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products); se
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
  });
  app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

  app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, ingredients, benefits, image } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            ingredients,
            benefits, 
            image
        }, { new: true });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Server error' });
    }
});
  
 
  app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted' });
  });
  app.get('/data', async (req, res) => {
    try {
      const items = await Product.find(); 
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  
  // PUT Update Profile
  app.put('/profile/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { name, email, image } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, email, profileImage: image },
        { new: true }
      ).select('-password'); // Exclude password from response
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  // const storage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, 'uploads/');
  //   },
  //   filename: (req, file, cb) => {
  //     cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
  //   },
  // });
  
  
  
app.listen(PORT,()=>{
    console.log("server running "+PORT )
})
