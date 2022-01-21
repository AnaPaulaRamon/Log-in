import express from 'express';
import cors from 'cors';
const router = express.Router();
import {users} from '../daos/index.js'


router.use(express.json()); 
router.use(express.urlencoded({extended: true}));
router.use(cors());

//GETS
router.get('/', (req,res) => {+
    users.getAll().then(result => {
        res.send(result.payload.slice(-1));
    })
})

export default router;