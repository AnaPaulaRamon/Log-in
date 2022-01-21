import express from 'express';
import cors from 'cors';
import {engine} from 'express-handlebars';
import messagesRouter from './routes/messages.js';
import __dirname from './utils.js';
import {Server} from 'socket.io';
import {mensajes,productos,users} from './daos/index.js'
import ProductTestRouter from './routes/productos-test.js';
import UserRouter from './routes/users.js';
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log("Listening on port", PORT)
});


const baseSession = (session({
    store:MongoStore.create({mongoUrl:"mongodb+srv://Ana:123@ecommerce.y9kyu.mongodb.net/ecommerce?retryWrites=true&w=majority"}),
    resave:false,
    saveUninitialized:false,
    secret:"CoderChat",
    cookie:{
        maxAge: 6000,
    }
}))

export const io = new Server(server);

app.engine('handlebars',engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(baseSession);
app.use((req,res,next)=>{
    console.log(new Date().toTimeString().split(" ")[0], req.method, req.url);
    next();
})
app.use(express.static(__dirname+'/public'));
app.use('/api/productos-test',ProductTestRouter);
app.use('/api/users',UserRouter);
app.use('/api/messages', messagesRouter);


app.get('/view/productos',(req,res)=>{
    productos.getAll().then(result=>{
        let info = result.payload;
        let preparedObject = {
            productos : info
        }
        res.render('productos',{productos:info});
    })
})

//socket
io.on('connection', async socket=>{
    console.log(`El socket ${socket.id} se ha conectado`)
    let products = await productos.getAll();
    socket.emit('productsList',products);
    console.log('Cliente conectado');
    socket.emit('messagelog', mensajes); // solo envia el historial de mensajes al cliente que se acaba de conectar
    socket.on('message', data=>{
         const messageArr = mensajes.registerMessage(data).then(res => {return res});
         messageArr.then(result => {
             io.emit('messagelog', result.messages);
         });
    });
    let user = await users.getAll();
    user = user.payload.slice(-1);
    socket.emit('userLogin',user);
})

app.post('/login', async(req,res)=>{
    let {username} = req.body;
    if(!username) return res.status(400).send({error:"Incomplete field"})
    const usuario = await users.logInUser({username:username});
    req.session.user={
        username:username
    }
    res.send({status:"logged"})
})

app.get('/logout',(req,res)=>{
    req.session = null;
    res.redirect('/index.html');
})