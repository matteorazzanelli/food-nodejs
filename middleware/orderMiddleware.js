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

module.exports = insertOrderMiddleware;