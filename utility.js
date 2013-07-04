/*
 * JavaScript Utility Functions Library v0.0.1
 * Copyright (c) 2012 Rohit Sharma
 */

(function() {
  var utility = {};
  utility.hasOwnProperty = Object.prototype.hasOwnProperty;
  
  utility.isEmpty = function(object){
    if(object == null) return true;
    if(object === null) return true;
    if(typeof(object)=='boolean') return false;
    if(typeof(object)=='undefined') return true;
    if(typeof(object)=='number') return false;
    // Assume if it has a length property with a non-zero value then that property is correct.
    if(object.length && object.length > 0)    return false;
    if(object.length && object.length === 0 && typeof(object)!= "object")  return true;
  
    for(var key in object){
      if(utility.hasOwnProperty.call(object, key))
        return false;
    }
  
    return true;
  };

  utility.interpolate = function(string, value_object) {
    return string.replace(/{{([^{}]*)}}/g,
      function (a, b) {
        var r = value_object[b];
        return typeof r === 'string' || typeof r === 'number' ? r : a;
      }
    );
  };

  utility.parseDate = function(string){
    var date = (new Date(string)).toDateString();
    if(date === "Invalid Date"){
      var d = new Date();
      return utility.parseDate(d)
    }
    return date;
  };
  
  utility.sizeOfObject = function(object){
    var size = 0;
    for (var key in object) {
      if(utility.hasOwnProperty.call(object, key))
        size++;
    }
    return size;
  };

  utility.compareObject = function(o1, o2, type_comparison){
    if(type_comparison != true){type_comparison = false;}
  
    if(utility.sizeOfObject(o2) != utility.sizeOfObject(o1)){
      return false;
    }
  
    for(var key in o1){
      if(type_comparison){
        if(!(o1[key] === o2[key])){
          return false;
        }
      }
      else{
        if(!(o1[key] == o2[key])){
          return false;
        }
      }
    }
  
    return true;
  };
  
  utility.randomString = function(length){
    if(typeof(length) != 'number'){length = 8;}
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };
  
  utility.roundNumber = function(num, dec){
    if(utility.isEmpty(dec)){dec = 2;}
    return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
  };
  
  utility.map = function(array, key){
    if(!utility.isEmpty(array) && array.length){
      var return_value = [];
      for(var item in array){
        return_value.push(array[item][key])
      }
      return return_value;
    }
  };
  
  utility.destroyAllCookies = function(){
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++){
      document.cookie = cookies[i].split("=")[0] + "=" + "" + "; path=/";
    }
  };
  
  utility.compactArray = function(array, overwrite){
    if(overwrite != true){overwrite = false;}

    var return_array = [];
    for(var index in array){
      if(!utility.isEmpty(array[index])){
        return_array.push(array[index]);
      }
    }

    if(overwrite){
      array = return_array;
      return array;
    }
    else{
      return return_array;
    }
  };
  
  window.utility = utility;
})();
