// file: array.js

function array_clear(){ this.array = [];}

function array_concat(rawObj){
  obj = rawObj;
  if (functionName(obj) == 'Array' || functionName(obj) == 'String') {
    puts ('dude : ' + functionName(obj));
    obj = o(rawObj);
  }
  puts ('here typeof' + (typeof obj));
  puts ('here constructor' + (obj.constructor.slice(0,20)));
  native_obj = obj.is_a('Array') ? obj.array : obj.string
  this.array = this.array.concat(native_obj);
  return this;
}

function array_delete_at(i){ 
  var r = this.array.splice(i,1)[0];
  return r;
}

function array_detect(f){
  
  var r = [], bFlag = false, i = 0;
    
  do { 
    if (f(this.array[i]) == true) {
      r = this.array[i];
      bFlag = true;
    }
    i++;
  }  while (bFlag == false && i < this.array.length)
  
  type = rbType(r);
  return type ? rb[type].new(r) : r

}

function array_each(f){  

  var a = [];
  for (var i = 0; i < this.array.length; i++) {
    a.push(f(this.array[i]));
  }
  return a;
}

function array_each2(f){  
  //this.last_method = '';  
  if (typeof f != 'function') return this;
  for (var i = 0; i < this.array.length; i++) {f(this.array[i]);}
}
function array_empty(){
  return this.length < 1
}


function array_flatten(){return 'still to do!';}
function array_get(index){ return this.array[index]; }
function array_last(){return this.array[this.array.length - 1];}
function array_length(){return this.array.length;}

function array_include(val){
  return this.array.indexOf(val) >= 0
}

// -- inject related -----------------
// a.inject(0, add);
function add(r, x){return r + x}

// a.inject(0, function(r, x){return r + x})
function array_inject(arg, f){

  // the arg is the datatype    
  rtype = {String: arg, Object: rb.Hash.new(), Array: '', Number: arg};
  result = rtype[functionName(arg).to_s()];
  this.each(function(x){
    result = f(result, x);
  });
  return result;
}

function scan_a(raw_a) {
  var a = [];
  raw_a.each(function(x){
    if (typeof x != 'undefined' && functionName(x).to_s() == 'rbArray') {
      a.push(scan_a(x));
    }
    else {
      a.push((functionName(x).to_s() == 'Number' || 
        (functionName(x).to_s() == 'String' && x[0] == ':')) ?
          x : '"' + x + '"');
    }
  });
  return '[' + a.join(', ') + ']';
}

function array_inspect(){
    
  //return "[" + this.array.join(', ') + "]";
  return scan_a(this);
}

function array_join(separator){
  
  if (typeof separator == 'undefined') {
    var s = this.inject('',function(r,x){return r + x});
    return o(s)
  }
  else {
    var s = this.inject('',function(r,x){return r + separator + x});
    var i = separator.length;
    return o(s).range(i,-1);
  } 
}

function array_map2(f){
  if (typeof f != 'function') {
    //this.last_method = 'map';
    return this;
  }  
  var basic_a = [];
  this.each(function(x){ basic_a.push(f(x)); });
  var a = rb.Array.new(basic_a);
  //a.last_method = 'map';
  return a;
}


function array_partition(f){
  
  var a_true = rb.Array.new(), a_false = rb.Array.new();
  this.each(function(x){ (f(x) == true) ? a_true.push(x) : a_false.push(x); });
  return rb.Array.new([a_true, a_false]);
}

function array_range(x1,x2){
  
  var a = this.array;
  var result;
  
  if (x2 != -1) {
    x2++;
    //if (x2 <= -2) x2++;
    result = a.slice(x1,x2);
  }
  else
    result = a.slice(x1);
    
  return rb.Array.new(result);
}

function array_reject(f){
  
  var r = o(this.array);
  this.each().with_index(function(x, i){ if (f(x) == true) r.delete_at(i); });
  return r;
}

// a.select(function(x){ return (x < 6)}) 
function array_select(f){
  
  var r = [];
  this.each(function(x){ if (f(x) == true) r.push(x); })
  return o(r);
}

function array_shift(count){
  var result;

  if (typeof count == 'undefined') {
    result = this.array.shift();
  }
  else {
    var a = [];
    for (var i = 0; i < count; i++){a.push(this.array.shift());}
    result = o(a);

  }
  
  return result;  
}

function array_size(){ return this.array.length;}
function array_slice(x1,x2){
  
  var a = this.array;
  var result;
  
  if (typeof x1 == 'undefined') return nil

  if (typeof x2 == 'undefined') {
    result = a.slice(x1, x1+1);
  }
  else {
    if (x2 > x1) result = a.slice(x1, x1+x2);
    else result = x2 < 0 ? nil : ''
  }  

  return rb.Array.new(result);
}

function array_slice_p(x1,x2){
  
  if (typeof x1 == 'undefined') return nil  

  if (typeof x2 == 'undefined') {
    result = this.slice(x1);
    //result = a.slice(x1, x1+1);
    this.array.splice(x1, x1+1)
  }
  else {
    if (x2 > x1) {
      result= this.slice(x1, x2);
      //result = a.slice(x1, x1+x2);
      this.array.splice(x1, x1+x2);
    }
    else return x2 < 0 ? nil : ''
  }  

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
    result = rb.Array.new(a);
  }
    
  return result;
}

function array_push(){
  for (var x in arguments){this.array.push(arguments[x]);}  
}

function reverse(){  return this.array.reverse();}

function array_unshift(){
  for (x in arguments){this.array.unshift(arguments[x]);}  
}

function array_set(index, value){
  this.array[index] = value;  
}

function array_to_a(){  return this.array;}

function array_with_index(f){
  
  var basic_a = [];

  for (var i = 0; i < this.array.length; i++) {
    basic_a.push(f(this.array[i], i));
  }
  var a = rb.Array.new(basic_a);

  return a;  
}

function array_zip(a2){
  return this.map().with_index(function(x,i){
    return rb.Array.new([x, a2.at(i)]);
  });
}

function rbArray(i, obj){

  this.at = array_get;
  this.clear = array_clear;
  this.concat = array_concat;
  this.delete_at = array_delete_at;
  this.detect = array_detect;
  this.empty = array_empty;
  this.custom_each = array_each;    
  this.flatten = array_flatten;
  this.get = array_get;
  this.include = array_include;
  this.inject = array_inject;  
  this.inspect = array_inspect;
  this.join = array_join;
  this.last = array_last;
  this.last_method = '';
  this.length = array_length;
  //this.map = array_map;

  this.partition = array_partition;
  this.pop = array_pop;
  this.push = array_push;  
  this.range = array_range;
  this.reject = array_reject;
  this.reverse = reverse;
  this.select = array_select;
  this.set = array_set;
  this.shift = array_shift;
  this.size = array_size;
  this.slice = array_slice;
  this.slice_p = array_slice_p;
  
  this.temp_array = nil;
  this.to_a = array_to_a;  
  this.unshift = array_unshift;
  //this.with_index = array_with_index;
  this.zip = array_zip;
     
  if (typeof i == 'undefined') this.array = new Array;
  else {
    if (functionName(i).to_s() == 'Array' || functionName(i).to_s() == 'NodeList') {
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
}

