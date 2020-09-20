import UserController from '../controllers/UserController';
import SessionController from '../controllers/SessionController';
import PermissionController from '../controllers/PermissionController';
import RoleController from '../controllers/RoleController';
import { Router } from 'express';
import ProductController from '../controllers/ProductController';

import { is } from '../middlewares/permissions'

const router = Router();

const userController = new UserController();
const sessionController = new SessionController();
const permissionController = new PermissionController();
const roleController = new RoleController();
const productController = new ProductController();

router.post('/users', userController.create);

router.post('/sessions', sessionController.create)
  ;
router.post('/permissions', permissionController.create);

router.post('/roles', roleController.create);

router.post('/products', is(['ROLE_ADMIN']), productController.create);
router.get('/products', productController.index);
router.get('/products/:id', is(['ROLE_ADMIN', 'ROLE_USER']), productController.show);


export { router }
