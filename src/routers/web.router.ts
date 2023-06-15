import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

export const productRoutes = Router();

productRoutes.get('/create', ProductController.getCreatepage);
productRoutes.post('/create', ProductController.addNewProduct);
productRoutes.get('/list',ProductController.getListProduct);