import express from 'express';
import { createListing,getUserListings } from './../controller/listingController.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();
router.post('/create', verifyToken, createListing);

router.get('/listings/:id', verifyToken, getUserListings)
export default router;