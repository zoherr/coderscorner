"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const order_controller_1 = require("../controller/order.controller");
const orderFailed_controller_1 = require("../controller/orderFailed.controller");
const orderRouter = express_1.default.Router();
orderRouter.post('/create-order', auth_1.isAuthenticated, order_controller_1.createOrder);
orderRouter.get('/get-orders', auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), order_controller_1.getAllUsers);
orderRouter.get('/payment/stripepublishablekey', order_controller_1.sendStripePublishableKey);
orderRouter.post('/payment', auth_1.isAuthenticated, order_controller_1.newPayment);
orderRouter.get('/get-orders-failed', auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), orderFailed_controller_1.getAllOrderFailed);
orderRouter.post('/create-order-failed', auth_1.isAuthenticated, orderFailed_controller_1.createOrderfailed);
orderRouter.delete('/delete-order-failed/:id', auth_1.isAuthenticated, orderFailed_controller_1.deleteOrderFailed);
exports.default = orderRouter;
