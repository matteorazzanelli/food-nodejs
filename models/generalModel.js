
class GeneralModel {
  constructor(connection){
    this.connection = connection.promise();
    this.queryResult =  {
      rows: undefined, 
      fields:undefined, 
      error:undefined
    };
    console.log('general model');
  }
}

module.exports = {GeneralModel};