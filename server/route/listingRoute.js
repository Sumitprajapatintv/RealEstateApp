import express from 'express';
import { createListing,getUserListings,deleteListing,updateListing ,getListing } from './../controller/listingController.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();
router.post('/create', verifyToken, createListing);

router.get('/listings/:id', verifyToken, getUserListings)

router.delete('/delete/:id', verifyToken, deleteListing);

router.post('/update/:id', verifyToken, updateListing);

router.get('/get/:id', getListing);

export default router;