import express from 'express';
import { 
    createEvent, 
    deleteEvent, 
    filterEvent, 
    listEvent, 
    pagination, 
    updateEvent 
} from '../controllers/eventController.js';
import { authMiddleware } from '../middleware/auth.js';

const eventRouter = express.Router();

eventRouter.post('/create', authMiddleware, createEvent);
eventRouter.get('/listevent', authMiddleware, listEvent);
eventRouter.get('/filter', authMiddleware, filterEvent);
eventRouter.get('/pagination', authMiddleware, pagination);
eventRouter.put('/edit/:id', authMiddleware, updateEvent);  
eventRouter.delete('/delete/:id', authMiddleware, deleteEvent); 

export default eventRouter;
