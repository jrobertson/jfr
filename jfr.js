// file: jfr.js

function methods(){
  var a = [];
  for (x in this){a.push(x);}
  return new rb.Array(a);
}

function array_delete_at(i){ 
  var r = this.array.splice(i,1)[0];
  this.length = this.array.length;
  return r;
}

function array_each(f){  
  this.last_method = '';
  if (typeof f != 'function') return this;
  for (var i = 0; i < this.array.length; i++) {f(this.array[i]);}
}

function array_first(){return this.array[0];}
function array_last(){return this.array[this.array.length - 1];}

// a.inject(0, add);
function add(r, x){return r + x}

// a.inject(0, function(r, x){return r + x})
function array_inject(arg, f){

  // the arg is the datatype    
  rtype = {String: arg, Object: new rb.Hash, Array: '', Number: arg};
  result = rtype[functionName(arg)];
  this.each(function(x){
    result = f(result, x);
  });
  return result;
}

function array_map(f){
  if (typeof f != 'function') return this;

  var a = [];
  this.each(function(x){a.push(f(x));});
  this.last_method = 'map';
  return new rbArray(a);
}

function array_max(){ return this.sort().last();}
function array_min(){ return this.sort().first();}

function array_range(x1,x2){
  
  var a = this.array;
  
  if (x2 != -1) {
    if (x2 <= -2) x2 ++;
    return a.slice(x1,x2);
  }
  else
    return a.slice(x1)
}

function array_reject(f){
  
  var r = new rb.Array(this.array);
  this.each().with_index(function(x, i){ if (f(x) == true) r.delete_at(i); });
  return r;
}

// a.select(function(x){ return (x < 6)}) 
function array_select(f){
  
  var r = [];
  this.each(function(x){ if (f(x) == true) r.push(x); })
  return new rb.Array(r);
}

function array_shift(count){
  var result;

  if (typeof count == 'undefined') {
    result = this.array.shift();
  }
  else {
    var a = [];
    for (var i = 0; i < count; i++){a.push(this.array.shift());}
    result = new rbArray(a);

  }
  
  this.length = this.array.length;
  return result;  
}

function array_slice(x1,x2){
  
  var a = this.array;
  if (typeof x1 == 'undefined') return null

  if (typeof x2 == 'undefined') {
    result = a.slice(x1, x1+1);
  }
  else {
    if (x2 > x1) result = a.slice(x1, x1+x2);
    else return x2 < 0 ? null : ''
  }  

  return new rb.Array(result);
}

function array_slice_p(x1,x2){
  
  if (typeof x1 == 'undefined') return null  

  if (typeof x2 == 'undefined') {
    result = this.slice(x1);
    //result = a.slice(x1, x1+1);
    this.array.splice(x1, x1+1)
    this.length = this.array.length;
  }
  else {
    if (x2 > x1) {
      result= this.slice(x1, x2);
      //result = a.slice(x1, x1+x2);
      this.array.splice(x1, x1+x2);
      this.length = this.array.length;
    }
    else return x2 < 0 ? null : ''
  }  

  return result;
}

function array_sort(){  return new rb.Array(this.array.sort());}
function array_unshift(){
  for (x in arguments){this.array.unshift(arguments[x]);}  
  this.length = this.array.length; 
}

function array_with_index(f){
  var a = [];
  for (var i = 0; i < this.array.length; i++) {a[i] = f(this.array[i], i);}
  result = this;
  if (this.last_method == 'map') result = a;
  this.last_method = '';
  return result;
}

function array_pop(count){

  var result;

  if (typeof count == 'undefined') {
    result = this.array.pop();
  }
  else {
    var a = [];
    for (var i = 0; i < count; i++){a.push(this.array.pop());}
    result = new rbArray(a);
  }
  
  this.length = this.array.length;
  return result;
}

function array_push(){
  for (var x in arguments){this.array.push(arguments[x]);}  
  this.length = this.array.length;
}

function array_set(index, value){
  this.array[index] = value;
  this.length = this.array.length;
}

function array_get(index){ return this.array[index]; }

function reverse(){  return this.array.reverse();}

function array_to_a(){  return this.array;}

function rbArray(i, obj){

  this.delete_at = array_delete_at;
  this.each = array_each;  
  this.first = array_first;
  this.get = array_get;
  this.inject = array_inject;  
  this.length = 0;
  this.last = array_last;
  this.map = array_map;
  this.max = array_max;
  this.methods = methods;
  this.min = array_min;
  this.pop = array_pop;
  this.public_methods = methods;
  this.push = array_push;  
  this.range = array_range;
  this.reject = array_reject;
  this.reverse = reverse;
  this.select = array_select;
  this.set = array_set;
  this.shift = array_shift;
  this.slice = array_slice;
  this.slice_p = array_slice_p;
  this.sort = array_sort;
  this.to_a = array_to_a;  
  this.unshift = array_unshift;
  this.with_index = array_with_index;
     
  if (typeof i == 'undefined') this.array = new Array;
  else {
    if (functionName(i) == 'Array' || functionName(i) == 'NodeList') {
      if (typeof obj != 'undefined') {        
        this.array = new Array;
        for (var j = 0; j < i - 1; j++) { this.array[j] = obj;}
      }
      else {
        this.array = new Array;
        for (var j = 0; j < i.length; j++) { this.array[j] = i[j];}
      }
    }
    else this.array = new Array(i);
  }
  this.length = this.array.length;
}

function to_a(){
  var a = new rb.Array();
  for (var i = this.x1; i <= this.x2; i++) {a.set(i,i);}
  return a;
}

function rbRange(x1,x2){

  this.x1 = x1;
  this.x2 = x2;
  this.to_a = to_a;

}
function string_set(v) { this.string = v; }
function string_get()  { return this.string; }
function upcase()   { return this.string.toUpperCase(); }
function downcase() { return this.string.toLowerCase(); }

function split(pattern){
  return this.string.split(pattern);
}

function sub(pattern, newString) {
  s = new String(this.string);
  return s.replace(pattern, newString);
}

function functionName(object){
  rawName = object.constructor.toString().slice(9);
  pos = rawName.indexOf('(',0);
  return rawName.slice(0, pos);
}

function gsub(rawPattern, newString) {

  s = new String(this.string);
  pattern = rawPattern;

  if (functionName(rawPattern) == 'RegExp') {
    pattern = rawPattern.toString().slice(1, -1);
  }

  regex = new RegExp(pattern, 'g');
  return s.replace(regex, newString);
}

function string_range(x1, x2) {

  var s = this.string;

  if (x2 != -1)
    return s.slice(x1,x2+1);
  else
    return s.slice(x1)
}

function string_range3(x1, x2) {

  var s = this.string;
  s.slice(x1,x2);
  
  if (x2 != -1)
    return s.slice(x1,x2);
  else
    return s.slice(x1)
}


function string_slice(x1,x2){

  var s = this.string;
  if (typeof x1 == 'undefined') return null

  if (typeof x2 == 'undefined') {
    return s.slice(x1, x1+1);
  }
  else {
    if (x2 > x1) return s.slice(x1, x2);
    else return x2 < 0 ? null : ''
  }
}

function string_to_s(){return this.string;}

function rbString(s){

  this.string = String(s);
  this.length = this.string.length;
  this.set = string_set;
  this.get = string_get;
  this.gsub = gsub;
  this.upcase = upcase;
  this.downcase = downcase;
  this.range = string_range;
  this.range3 = string_range3;
  this.slice = string_slice;
  this.split = split;
  this.sub = sub;
  this.to_s = string_to_s;
  this.methods = methods; this.public_methods = methods;
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
  for (var x in this.hash){ a.push(this.array[x]);}
  return a;
}

function hash_clone(){ return new rbHash(this.hash);}

function hash_find_length(){
  var count = 0;
  for (var x in this.hash){ count++;}
  this.length = count;
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

function hash_set(key, value){
  this.hash[key] = value;
  this.find_length();
  return value;
}

function rbHash(raw_h){
  this.clone = hash_clone;
  this.find_length = hash_find_length;
  this.get = hash_get;
  this.length = 0;
  this.hash = {};
  if (typeof raw_h == 'object') {
    for (var x in raw_h){this.hash[x] = raw_h[x];}
  }
  this.find_length();
  this.keys = hash_values;
  this.merge = hash_merge;
  this.merge_p = hash_merge_p;
  this.set = hash_set;
  this.values = hash_values;
  this.methods = methods; this.public_methods = methods;
}

rb = {  Array: rbArray, String: rbString, Range: rbRange, Hash: rbHash}

function puts(s){console.log(s);}

var a = new rb.Array([3,5,7,2,78,1]);
