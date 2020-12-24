const config = process.env;

export default {
  text: function(_message){
    if(config.NODE_ENV !== 'production'){
      console.log(_message);
    }
  },
  obj: function(_title,_object){
    if(config.NODE_ENV !== 'production'){
      console.log(_title,_object);
    }
  }
}
