import express from 'express';
import { handleChat } from '../controllers/chatControllers.js';
import {handleOpenRouter} from '../controllers/openRouterController.js'

const router=express.Router();

router.post('/chat',handleChat);
router.post('/openrouter',handleOpenRouter);

export default router;
