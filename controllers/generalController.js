class GeneralController{
  constructor(){
    this.statusCode = -1;
    this.success = false;
    this.content = {};
    console.log('general controller');
  }

  setCode(code){this.statusCode = code;}
  setSuccess(success){this.success = success;}
  setContent(content){this.content = content;}

  renderApi(res){ // only json, no front-end
    return res.status(this.statusCode)
      .json({success: this.success, content: this.content});
  }
}

module.exports = {GeneralController};