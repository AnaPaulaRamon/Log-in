import express from 'express';
import cors from 'cors';
const router = express.Router();
import {productos} from '../daos/index.js'


router.use(express.json()); 
router.use(express.urlencoded({extended: true}));
router.use(cors());

//GETS
router.get('/', (req,res) => {+
    productos.getAll().then(result => {
        res.send(result.payload);
    })
})

//POSTS
router.post('/',(req,res)=>{
    productos.generateProd().then(result => {
        res.send(result);
    })
})

// DELETES
router.delete('/', (req,res) => {
    productos.deleteAll().then(result => {
        res.send(result);
    })
})

export default router;