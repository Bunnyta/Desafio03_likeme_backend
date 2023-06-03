import {Router} from 'express';
import { postController } from '../controllers/post.controller.js';


const router = Router()


router.get('/posts', postController.getAllPost );
router.get("/posts/:id", postController.getPost);   
router.post("/posts", postController.createPost); 
router.delete("/posts/:id", postController.deletePost);
router.put('/posts/:id', postController.updatePost);
 

export default router;