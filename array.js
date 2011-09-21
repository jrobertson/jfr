// file: array.js


function array_delete_at(i){ 
  var r = this.array.splice(i,1)[0];
  this.length = this.array.length;
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
  return type ? new rb[type](r) : r

}

function array_each(f){  
  this.last_method = '';
  if (typeof f != 'function') return this;
  for (var i = 0; i < this.array.length; i++) {f(this.array[i]);}
}

function array_first(){return this.array[0];}
function array_flatten(){return 'still to do!';}

function array_last(){return this.array[this.array.length - 1];}

function array_include(val){
  return this.array.indexOf(val) >= 0
}

// -- inject related -----------------
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

function array_join(separator){
  
  if (typeof separator == 'undefined') {
    var s = a.inject('',function(r,x){return r + x});
    return new rb.String(s)
  }
  else {
    var s = a.inject('',function(r,x){return r + separator + x});
    var i = separator.length;
    return new rb.String(s).range(i,-1);
  } 
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
  this.detect = array_detect;
  this.each = array_each;  
  this.first = array_first;
  this.flatten = array_flatten;
  this.get = array_get;
  this.include = array_include;
  this.inject = array_inject;  
  this.join = array_join;
  this.length = 0;
  this.last = array_last;
  this.map = array_map;
  this.max = array_max;
  this.min = array_min;
  this.pop = array_pop;
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
