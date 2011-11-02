// file: array.js

function array_at(raw_index){ 
  var index = (raw_index >= 0) ? raw_index : this.array.length + raw_index;
  var r = this.array[index]; 
  return r != null ? r : nil
}

function array_clear(){ this.array = [];}
function array_clone(){ return  o(this.array); }
function array_compact(){ return this.reject(function(x){return x == nil;});}
function array_compact_p(){ this.array = this.compact().array; return this;}

function array_concat(rawObj){
  this.array = this.array.concat(o(rawObj));
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
  return type ? rb[type].new(r) : r;
}

function array_each(f){  
  var a = [];
  for (var i = 0; i < this.array.length; i++) {
    a.push(f(this.array[i]));
  }
  return a;
}

function array_empty(){
  return this.length < 1
}

function array_flatten(){return 'still to do!';}
function array_last(){return this.array[this.array.length - 1];}
function array_length(){return this.array.length;}

function array_include(val){
  return this.array.indexOf(val) >= 0;
}

// -- inject related -----------------
// a.inject(0, add);
function add(r, x){return r + x;}

// a.inject(0, function(r, x){return r + x})

function scan_a(raw_a) {
  var a = [];
  raw_a.each(function(x){
    if (typeof x != 'undefined' && functionName(x).to_s() == 'rbArray') {
      a.push(scan_a(x));
    }
    else {
      var type = functionName(x).to_s();      
      if (type != 'undefined'){
        if (type == 'Number' || (type == 'String' && x[0] == ':'))  { a.push(x);}
        if (type == 'rbHash' || type == 'rbString' || type == 'rbFixnum') 
          { a.push(x.inspect()); }
        else { a.push('"' + x + '"'); }
      }
      else { a.push('"' + x + '"'); }
    }
  });
  return '[' + a.join(', ') + ']';
}

function array_inspect(){  return scan_a(this);}

function array_join(separator){  
  if (typeof separator == 'undefined') {
    var s = this.inject('',function(r,x){return r + x.to_n()});
    return o(s)
  }
  else {
    var s = this.inject('',function(r,x){return r + separator + x.to_n()});
    var i = separator.length;
    return o(s).range(i,-1);
  } 
}

function array_map_p(f){ this.array = this.map(f);  return this;}

function array_partition(f){  
  var a_true = new rbArray(), a_false = new rbArray();
  this.each(function(x){ (f(x) == true) ? a_true.push(x) : a_false.push(x); });
  return new rbArray([a_true, a_false]);
}

function array_range(x1,x2){  
  var a = this.array;
  var result;  
  if (x2 != -1) {
    x2++;
    result = a.slice(x1,x2);
  }
  else {
    result = a.slice(x1);
  }
  return new rbArray(result);
}

function array_reject_p(f){ this.array = this.reject(f).array; return this;}
function array_select_p(f){ this.array = this.select(f).array; return this;}

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
  if (typeof x1 == 'undefined') return nil;
  if (typeof x2 == 'undefined') {
    result = a.slice(x1, x1+1);
  }
  else {
    if (x2 > x1) result = a.slice(x1, x1+x2);
    else {result = x2 < 0 ? nil : '';}
  }  
  return new rbArray(result);
}

function array_slice_p(x1,x2){  
  if (typeof x1 == 'undefined') return nil ;
  if (typeof x2 == 'undefined') {
    result = this.slice(x1);
    this.array.splice(x1, x1+1);
  }
  else {
    if (x2 > x1) {
      result= this.slice(x1, x2);
      this.array.splice(x1, x1+x2);
    }
    else {return x2 < 0 ? nil : '';}
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
    result = new rbArray(a);
  }    
  return result;
}

function array_push(){
  for (var x in arguments){this.array.push(arguments[x]);}  
}

function array_reverse(){ return rb.Array.new(this.array.reverse());}

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
  var a = new rbArray(basic_a);
  return a;  
}

function array_zip(a2){
  return this.map().with_index(function(x,i){
    return new rbArray([x, a2.at(i)]);
  });
}

function scan_a2(a){
  var a3 = [];
  for (var i = 0; i < a.length; i++) {
    x = a[i];
    a3.push( (functionName(x).regex(/Array/) != nil) ? scan_a(x) : o(x) );
  }
  return o(a3);
}

function rbArray(i, obj){
  this.at = array_at;
  this.clear = array_clear;
  this.clone = array_clone;
  this.compact = array_compact;
  this.compact_p = array_compact_p;
  this.concat = array_concat;
  this.delete_at = array_delete_at;
  this.detect = array_detect;
  this.empty = array_empty;
  this.custom_each = array_each;    
  this.flatten = array_flatten;
  this.include = array_include;  
  this.inspect = array_inspect;
  this.join = array_join;
  this.last = array_last;
  this.last_method = '';
  this.length = array_length;
  this.map_p = array_map_p;
  this.collect_p = array_map_p;
  this.partition = array_partition;
  this.pop = array_pop;
  this.push = array_push;  
  this.range = array_range;
  this.reject_p = array_reject_p;
  this.reverse = array_reverse;
  this.select_p = array_select_p;
  this.set = array_set;
  this.shift = array_shift;
  this.size = array_size;
  this.slice = array_slice;
  this.slice_p = array_slice_p;  
  this.temp_array = nil;
  this.to_a = array_to_a;  
  this.unshift = array_unshift;
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
        for (var j = 0; j < i.length; j++) {
          var item = (functionName(i[j]).to_s() == 'Object' || 
            functionName(i[j]).to_s() == 'String' ||
            functionName(i[j]).to_s() == 'Array' || 
            functionName(i[j]).to_s() == 'Number') ? o(i[j]) : i[j];
          this.array.push(item);
        }
      }
    }
    else this.array = new Array(i);
  }  
}

