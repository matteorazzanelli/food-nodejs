
// load product model
const {dbConfig} = require('../config');
const {OrderModel} = require('../models/orderModel');
// pass db connection as constructor parameter
const om = new OrderModel(dbConfig);

const { GeneralController } = require('./generalController');

class OrderController extends GeneralController{

  listOrders = async (res) => {
    console.log('list all orders');
    const result = await om.selectAll('orders');
    this.setCode(!result.error ? 200 : 403);
    this.setSuccess(!result.error);
    this.setContent(result.error ?? result.rows);
    return this.renderApi(res);
  }

  insertOrder = async (content, res) => {
    console.log('add order');
    const result = await om.insert(content);
    this.setCode(!result.error ? 201 : 400);
    this.setSuccess(!result.error);
    this.setContent(result.error ?? result.rows);
    return this.renderApi(res);
  }

  modifyOrder = async (id, content, res) => {
    console.log('modify order : ', id);
    const result = await om.update(id, content, 'orders');
    this.setCode(result.rows.affectedRows>0 ? 200 : 404);
    this.setSuccess(result.rows.affectedRows>0);
    this.setContent(result.rows.affectedRows>0 ? result.rows : "Product not found");
    return this.renderApi(res);
  }

  deleteOrder = async (id, res) => {
    console.log('delete order : ', id);
    const result = await om.delete(id, 'orders');
    this.setCode(result.rows.affectedRows>0 ? 200 : 404);
    this.setSuccess(result.rows.affectedRows>0);
    this.setContent(result.rows.affectedRows>0 ? result.rows : "Order not found");
    return this.renderApi(res);
  }

  filterOrder = async (from, to, products, res) => {
    console.log('filter order : ', from, to, products);
    const result = await om.filter(from, to, products);
    this.setCode(!result.error ? 200 : 403);
    this.setSuccess(!result.error);
    this.setContent(result.error ?? result.rows);
    return this.renderApi(res);
  }

}

const orderController = new OrderController();
module.exports = {orderController};