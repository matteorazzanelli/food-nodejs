
class GeneralModel {
  constructor(connection){
    this.connection = connection.promise();
    console.log('general model');
  }
}

module.exports = {GeneralModel};