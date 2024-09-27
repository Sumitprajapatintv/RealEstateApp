import express from 'express';
import { createListing } from './../controller/listingController';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();
router.post('/create', verifyToken, createListing);
export default router;