const orderRepository     = require("../repositories/orderRepository");
const { saveAttachments } = require("./attachmentService");
const {calcTotal, re_calcTotal} = require("../utils/calcTotal");
const generateOrderCode   = require("../utils/generateOrderCode");

// CREATE
const createOrder = async (body, files) => {

  const total_amount = calcTotal(body.price, body.quantity);

  const data = {
    order_code:     generateOrderCode(),
    customer_name:  body.customer_name,
    order_date:     new Date(body.order_date),
    product_name:   body.product_name,
    price:          parseFloat(body.price),
    quantity:       parseInt(body.quantity),
    total_amount:   total_amount,
    payment_method: body.payment_method,
    order_status:   body.order_status
  };

  const order = await orderRepository.createOrder(data);

  if (files && files.length > 0) {
    await saveAttachments(order.order_id, files);
  }

  return order;

};


// GET ALL
const getOrders = async (query) => {

  const page  = parseInt(query.page) || 1;
  const limit = 10;
  const skip  = (page - 1) * limit;
  const sort  = query.sort || "created_at";

  const filters = { is_deleted: false };

  if (query.customer) {
    filters.customer_name = { contains: query.customer };
  }

  if (query.status) {
    filters.order_status = query.status;
  }

  const orders = await orderRepository.findAllOrders(filters, skip, limit, sort);
  const total  = await orderRepository.countOrders(filters);

  return { page, limit, total, data: orders };

};


// GET ONE
const getOrderById = async (id) => {
  const order = await orderRepository.findOrderById(id);
  return order;
};


// UPDATE
const updateOrder = async (id, body) => {

        // get the existing order
    const existingOrder = await orderRepository.findOrderById(id);

    if (!existingOrder) {
        throw new Error("Order not found");
    }

    const data = {};

    // only update fields if provided
    if (body.customer_name !== undefined)
        data.customer_name = body.customer_name;

    if (body.order_date !== undefined)
        data.order_date = new Date(body.order_date);

    if (body.product_name !== undefined)
        data.product_name = body.product_name;

    if (body.price !== undefined)
        data.price = parseFloat(body.price);

    if (body.quantity !== undefined)
        data.quantity = parseInt(body.quantity);

    if (body.payment_method !== undefined)
        data.payment_method = body.payment_method;

    if (body.order_status !== undefined)
        data.order_status = body.order_status;

    // this only calculate if both price and quantity exist
    if (body.price !== undefined && body.quantity !== undefined) {
        data.total_amount = calcTotal(body.price, body.quantity);
    }

      //  here recalculated using OLD + NEW values
    const finalPrice = body.price !== undefined 
        ? parseFloat(body.price) 
        : existingOrder.price;

    const finalQuantity = body.quantity !== undefined 
        ? parseInt(body.quantity) 
        : existingOrder.quantity;

    data.total_amount = re_calcTotal(finalPrice,finalQuantity);

  const order = await orderRepository.updateOrderById(id, data);
  return order;

};


// DELETE
const deleteOrder = async (id) => {
  await orderRepository.softDeleteOrderById(id);
};


module.exports = { createOrder, getOrders, getOrderById, updateOrder, deleteOrder };