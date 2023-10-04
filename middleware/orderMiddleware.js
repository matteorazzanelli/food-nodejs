const insertOrderMiddleware = (controller) => {
  return (req,res,next) => {
    const {content} = req.body;
    if(!content.date || isNaN(new Date(content.date))){
      controller.setCode(400); // bad request
      controller.setSuccess(false);
      controller.setContent("Provide a valid date.");
      return controller.renderApi(res);
    }
    if(!content.users || !content.users.length>0){
      controller.setCode(400); // bad request
      controller.setSuccess(false);
      controller.setContent("Provide a valid set of users.");
      return controller.renderApi(res);
    }
    if(!content.products || !content.products.length>0){
      controller.setCode(400); // bad request
      controller.setSuccess(false);
      controller.setContent("Provide a valid set of products.");
      return controller.renderApi(res);
    }
    next();
  }
}

const filterOrderMiddleware = (controller) => {
  return (req, res, next) => {
    const {from, to, products} = req.query;
    if(from && isNaN(new Date(from))){ // if exists but is malformed
      controller.setCode(400); // bad request
      controller.setSuccess(false);
      controller.setContent("Provide a valid 'from' date field.");
      return controller.renderApi(res);
    }
    if(to && isNaN(new Date(to))){
      controller.setCode(400); // bad request
      controller.setSuccess(false);
      controller.setContent("Provide a valid 'to' date field.");
      return controller.renderApi(res);
    }
    // make variable accessible from the external
    res.locals.from = new Date(from ? from : '1753-1-1')
    res.locals.to = new Date(to ? to : new Date(Date.now()))
    res.locals.products = products ? products.split(',') : ['']; //from string to array
    next();
  }

}

module.exports = {insertOrderMiddleware, filterOrderMiddleware};