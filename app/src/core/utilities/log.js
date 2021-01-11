import {store, envConfig} from "@/main";

let loggingAllowed = function(){
  if(envConfig.NODE_ENV !== 'production'){
    return true;
  } else if(store.getters.appConfig !== null && typeof store.getters.appConfig.DEBUG_MODE !== "undefined" && store.getters.appConfig.DEBUG_MODE){
    return true;
  } else {
    return false;
  }
}


export default {
  text: function(_message){
    if(loggingAllowed()){
      console.log(_message);
    }
  },
  obj: function(_title,_object){
    if(loggingAllowed()){
      console.log(_title,_object);
    }
  }
}
