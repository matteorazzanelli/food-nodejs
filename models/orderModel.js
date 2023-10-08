const {GeneralModel} = require("./generalModel");

class OrderModel extends GeneralModel {

  constructor(connection){
    super(connection);
    console.log('order model')
  }

  async insert(content){
    // no need to check due to middleware
    const dateObj = new Date(content.date);
    const userObj = content.users;
    const productObj = content.products;
    // check if products and users (i.e. foreign keys) exist
    if(!(await this.checkForeignKeys(productObj, 'products')) || !(await this.checkForeignKeys(userObj, 'users'))){
      this.queryResult.error = "Foreign key does not exist.";
      return this.queryResult;
    }
    try{
      // let's add the order record with date
      // FIXME: this.queryResult should be the result of the entire operation
      [this.queryResult.rows, this.queryResult.fields] = (await this.connection.execute(
        'INSERT INTO orders (date) VALUES (?)', [content.date]));
      // store the id
      const tempId = this.queryResult.rows.insertId;
      // for each product add a record in orders_products
      productObj.forEach(async (product) => {
        const [rows, fields] = (await this.connection.execute(
            'INSERT INTO orders_products (id_order,id_product) VALUES (?,?)',
            [tempId, product]));
      });
      // for each user add a record in orders_users
      userObj.forEach(async (user) => {
        const [rows, fields] = (await this.connection.execute(
            'INSERT INTO orders_users (id_order,id_user) VALUES (?,?)',
            [tempId, user]));
      });
    }
    catch(error){
      this.queryResult.error = error.sqlMessage;
      return this.queryResult;
    }
    
    return this.queryResult;
  }

  async update(id, content){
    // first delete from the table
    let result = (await this.delete(id, 'orders'));
    // then add products as new ones
    return (await this.insert(content));
  }

  async filter(from, to, products){
    // TODO: we want to reproduce a query like this
    // SELECT DISTINCT * FROM ( 
    // SELECT orders_products.id_order as idOrder FROM orders_products 
    // INNER JOIN products ON products.id = orders_products.id_product 
    // WHERE orders_products.id_product=1 OR orders_products.id_product=2 
    // ) r 
    // INNER JOIN orders as o ON r.idOrder=o.id 
    // AND o.date BETWEEN '1990-01-01' AND '2025-01-01'

    const values = products ? products.concat(from,to) : Array.prototype.concat(from, to);
    console.log(values, products, products)
    let whereClauseStr = '';
    if(products){
      let whereClause = products.map((item)=>{return 'orders_products.id_product=?'});
      whereClauseStr = 'WHERE '+whereClause.join(' OR ');
    }
    
    
    let query = `SELECT DISTINCT id,date FROM ( 
      SELECT orders_products.id_order AS idOrder FROM orders_products 
      INNER JOIN products ON products.id = orders_products.id_product 
      ${whereClauseStr}
      ) r 
      INNER JOIN orders AS o ON r.idOrder=o.id 
      AND o.date BETWEEN ? AND ?`;
    
    try{
      [this.queryResult.rows, this.queryResult.fields] = 
        (await this.connection.execute(query, values));
    }
    catch(error){
      this.queryResult.error = error.sqlMessage;
    }
    console.log(query)
    return this.queryResult;
  }
}

module.exports = {OrderModel};