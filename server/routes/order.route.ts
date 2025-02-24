import  express  from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createOrder, getAllUsers, newPayment, sendStripePublishableKey } from "../controller/order.controller";
import {  createOrderfailed,deleteOrderFailed,getAllOrderFailed } from "../controller/orderFailed.controller";

const orderRouter = express.Router();
orderRouter.post('/create-order', isAuthenticated,createOrder);
orderRouter.get('/get-orders',isAuthenticated,authorizeRoles("admin"),getAllUsers);
orderRouter.get('/payment/stripepublishablekey', sendStripePublishableKey);
orderRouter.post('/payment', isAuthenticated, newPayment);
orderRouter.get('/get-orders-failed',isAuthenticated,authorizeRoles("admin"),getAllOrderFailed);
orderRouter.post('/create-order-failed', isAuthenticated,createOrderfailed);
orderRouter.delete('/delete-order-failed/:id', isAuthenticated,deleteOrderFailed);





export default orderRouter;