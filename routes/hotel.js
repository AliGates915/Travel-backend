import express from 'express';

import{ 
    createHotel,updateHotel,deleteHotel, getHotel, getAllHotel, 
     getHotelRooms
} from '../controllers/hotel.js'

import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();
// CREATE
router.post('/',verifyAdmin, createHotel)
// UPDATE
router.put('/:id',verifyAdmin, updateHotel)
// DELETE
router.delete('/:id' ,verifyAdmin,deleteHotel)

router.get('/:id', getHotel);              // Then, this for hotel by ID
router.get('/', getAllHotel);              // Lastly, get all hotels


router.get("/room/:id", getHotelRooms);


export default router;