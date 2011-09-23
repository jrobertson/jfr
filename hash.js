// file: hash.js

function hash_clear(){ this.hash = {}; this.length = 0;}  

function hash_delete(key){

  var value = this.hash[key];
  delete this.hash[key];
  this.find_length();
  return new rb.String(value);
}

function hash_key(value){
  
  for (keyName in this.hash) {
    if (this.hash[keyName] == value) return new rb.String(keyName);
  }
}

function hash_keys(){
  var a = new rb.Array;
  for (var x in this.hash){ a.push(x);}
  return a;
}

function hash_get(key){
  return this.hash[key];
}

function hash_values(){
  var a = new rb.Array;
  for (var x in this.hash){ a.push(this.hash[x]);}
  return a;
}

function hash_clone(){ return new rbHash(this.hash);}
function hash_each(f){  for(key in this.hash) f(key,this.hash[key]); }

function hash_find_length(){
  var count = 0;
  for (var x in this.hash){ count++;}
  this.length = count;
}

function hash_inject(arg, f){

  // the arg is the datatype    
  rtype = {String: arg, Object: new rb.Hash, Array: '', Number: arg};
  result = rtype[functionName(arg).to_s()];
  this.each(function(k,v){
    result = f(result, k,v);
  });
  return result;
}

function hash_has_key(key){ return this.keys().include(key); }
function hash_map(f){
  if (typeof f != 'function') return this;
  
  var a = [];
  this.each( function(x){ a.push(f(x)); } );
  this.last_method = 'map';
  return new rb.Array(a);
}

function hash_merge(raw_h){
  var h = this.clone();
  for (var x in raw_h){ h.hash[x] = raw_h[x];}
  h.find_length;
  return h;
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
  
  return new rb.Array([key, value]) ;
}

function hash_has_value(val){ return this.values().include(val); }

function hash_values_at(key_list){
  h = this;

  return new rb.Array(key_list).map(function(x){
    return h.get(x);
  });
  
}

function rbHash(raw_h){
  this.clear = hash_clear;
  this.clone = hash_clone;
  this.delete = hash_delete;
  this.each = hash_each;
  this.find_length = hash_find_length;
  this.get = hash_get; 
  this.has_key = hash_has_key;
  this.inject = hash_inject;
  this.key = hash_key;
  this.keys = hash_keys;
  this.map = hash_map;
  this.merge = hash_merge;
  this.merge_p = hash_merge_p;
  this.reject = hash_reject;
  this.reject_p = hash_reject_p;
  this.set = hash_set;
  this.shift = hash_shift;
  this.update = hash_merge_p;
  this.values = hash_values;
  this.values_at = hash_values_at;
  this.length = 0;
  this.hash = {};
  
  if (typeof raw_h == 'object') {
    for (var x in raw_h){this.hash[x] = raw_h[x];}
  }
  
  this.find_length();  
}
