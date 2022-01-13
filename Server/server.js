import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import data from './data.js';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
mongoose.connect("mongodb+srv://admin:1230@cluster0.86onw.mongodb.net/shop?retryWrites=true&w=majority", {
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

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const Port = process.env.PORT || 5000;
app.listen(Port, ()=> {
    console.log(`Server is running at http://localhost:${Port}`);
})