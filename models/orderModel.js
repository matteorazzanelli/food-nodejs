const {GeneralModel} = require("./generalModel");

class OrderModel extends GeneralModel {

  constructor(connection){
    super(connection);
    console.log('construct order')
  }

  async selectAll(){
    // no need of prepared statement here
    try{
      [this.queryResult.rows, this.queryResult.fields] = 
        (await this.connection.query("SELECT * FROM orders"));
    }
    catch(error){
      this.queryResult.error = error.sqlMessage;
    }
    return this.queryResult; 
  }

  async insert(content){
    // no need to check due to middleware
    const dateObj = new Date(content.date);
    const userObj = content.users;
    const productObj = content.products;
    console.log(dateObj, userObj, productObj)
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
    // use a prepared statement to avoid SQL injection
    try{
      [this.queryResult.rows, this.queryResult.fields] = 
        (await this.connection.execute(
        'UPDATE products SET `name` = ? WHERE `id` = ?', [content, id]));
    }
    catch(error){
      this.queryResult.error = error.sqlMessage;
    }
    return this.queryResult;
  }

  async delete(id){
    // use a prepared statement to avoid SQL injection
    try{
      [this.queryResult.rows, this.queryResult.fields] = 
        (await this.connection.execute(
        'DELETE FROM orders WHERE `id` = ?', [id]));
    }
    catch(error){
      this.queryResult.error = error.sqlMessage;
    }
    return this.queryResult;
  }
}

module.exports = {OrderModel};