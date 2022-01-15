import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
// import data from './data.js';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
mongoose.connect(process.env.MONGO_URL, {
    // to get rid of deprecated warnings
    useNewUrlParser:true,
    useUnifiedTopology: true,
}).then(() => console.log("DB connects") )
.catch((err) => {
    console.log(err);
});
/* 
app.get('/api/products/:id',(req, res) => {
    const product = data.products.find(x => x._id === req.params.id);
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message : 'Product not found'});
    }
});
 static data
app.get('/api/products',(req, res) => {
    res.send(data.products);
}); */
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
// app.get('/', (req, res) => {
//     res.send('Server is ready');
// });

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const Port = process.env.PORT || 5000;
app.listen(Port, ()=> {
    console.log(`Server is running at http://localhost:${Port}`);
})