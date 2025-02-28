import express from  'express';

import { createEvent, filterEvent , listEvent, pagination } from '../controllers/eventController.js';
import { authMiddleware } from '../middleware/auth.js';


const eventRouter = express.Router();

eventRouter.post('/create' , authMiddleware , createEvent)
eventRouter.get('/listevent' , authMiddleware , listEvent)
eventRouter.get('/filter' , authMiddleware , filterEvent )
eventRouter.get('/pagination' , authMiddleware , pagination)

export default eventRouter
