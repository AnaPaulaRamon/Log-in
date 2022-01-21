import express from 'express';
import cors from 'cors';
const router = express.Router();
import {io} from '../app.js';
import {mensajes} from '../daos/index.js'

router.use(express.json()); 
router.use(express.urlencoded({extended: true}));
router.use(cors());


//GETS
router.get('/', (req,res) => {+
    mensajes.getAll().then(result => {
        res.send(result);
    })
})

//POSTS
router.post('/',(req,res)=>{
    let cuerpo = req.body;
    if(!cuerpo.user || !cuerpo.message) return res.send({status:"error", message:"Email or message missing"});
    mensajes.registerMessage(cuerpo).then(result => {
        res.send(result);
    })
})


export default router;