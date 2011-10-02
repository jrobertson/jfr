// file: hash.js

function hash_clear(){ this.hash = {}; this.length = 0;}  

function hash_delete(key){

  var value = this.hash[key];
  delete this.hash[key];
  this.find_length();
  return new rbSys.String(value);
}

function hash_key(value){
  
  for (keyName in this.hash) {
    if (this.hash[keyName] == value) return o(keyName);
  }
}

function hash_keys(){
  var a = [];
  for (var x in this.hash){ a.push(x);}
  return o(a);
}

function hash_get(key){
  return this.hash[key];
}

function hash_values(){
  var a = [];
  for (var x in this.hash){ a.push(this.hash[x]);}
  return o(a);
}

function hash_clone(){ return o(this.hash);}

function hash_each(f){
  
  var a = [];
  for (key in this.hash) {a.push(f(o([key,this.hash[key]])));}  
  return o(a);
}

function hash_each_pair(f){
  for(key in this.hash) f(key,this.hash[key]); 
}

function hash_find_length(){
  var count = 0;
  for (var x in this.hash){ count++;}
  this.length = count;
}
function hash_inspect(){

  var a = [];
  
  this.each_pair(function(k,v){
    a.push(':' + k + '=>"' + v + '"');
  });

  return "{" + a.join(', ') + "}";  
}

function hash_inject(arg, f){

  // the arg is the datatype    
  rtype = {String: arg, Object: rb.Hash.new(), Array: '', Number: arg};
  result = rtype[functionName(arg).to_s()];
  this.each(function(k,v){
    result = f(result, k,v);
  });
  return result;
}

function hash_has_key(key){ return this.keys().include(key); }
function hash_map2(f){
  if (typeof f != 'function') return this;
  
  var a = [];
  this.each( function(x){ a.push(f(x)); } );
  this.last_method = 'map';
  return o(a);
}

function hash_merge(raw_h){
  
  h = rb.Hash.new(raw_h);
  var h_copy = this.clone();  
  for (var x in h.hash){ h_copy.hash[x] = h.hash[x];}
  puts (h_copy);
  return h_copy;
}

function hash_merge_p(raw_h){
  for (var x in raw_h){ this.hash[x] = raw_h[x];}
  this.find_length();
  return this;
}

function hash_reject(f){
  
  var r = this.clone();

  for (keyName in this.hash){
    if (f(keyName, this.hash[keyName]) == true) r.delete(keyName);
  }
  return r;
}

function hash_reject_p(f){
  
  var r = this.clone();

  for (keyName in this.hash){
    if (f(keyName, this.hash[keyName]) == true) delete this.hash[keyName];
  }
  return r;
}

function hash_set(key, value){
  this.hash[key] = value;
  this.find_length();
  return value;
}

function hash_shift(){
  
  var key, value;
  
  key = this.keys().first();
  value = this.hash[key];
  this.delete(key);
  
  return o([key, value]) ;
}

function hash_has_value(val){ return this.values().include(val); }

function hash_values_at(key_list){
  h = this;

  return rb.Array.new(key_list).map(function(x){
    return h.get(x);
  });
  
}

function rbHash(raw_h){
  this.clear = hash_clear;
  this.clone = hash_clone;
  this.delete = hash_delete;
  this.custom_each = hash_each;
  this.each_pair = hash_each_pair;
  this.find_length = hash_find_length;
  this.get = hash_get; 
  this.has_key = hash_has_key;
  this.inspect = hash_inspect;
  this.inject = hash_inject;
  this.key = hash_key;
  this.keys = hash_keys;
  //this.map = hash_map;
  this.merge = hash_merge;
  this.merge_p = hash_merge_p;
  this.reject = hash_reject;
  this.reject_p = hash_reject_p;
  this.set = hash_set;
  this.shift = hash_shift;
  this.update = hash_merge_p;
  this.values = hash_values;
  this.values_at = hash_values_at;

  this.hash = {};
  
  if (typeof raw_h != 'undefined') {
    
    var objType = functionName(raw_h);
    
    if (objType.to_s() == 'Object' || objType.regex(/^rb[A-Z]\w+/) != nil){

      for (var x in raw_h){this.hash[x] = raw_h[x];}
      
    }
    else if (objType == 'Array') {
      
      eval("this.hash = {" + raw_h[0] + ": '" + raw_h[1] + "'};");
      
    }
  }
  
  this.find_length();  
}
