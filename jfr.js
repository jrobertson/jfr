// file: jfr.js


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
  var r = '';

  if (x2 != -1)
    r = s.slice(x1,x2+1);
  else
    r = s.slice(x1);
    
  return new rb.String(r);
}

function string_range3(x1, x2) {

  var s = this.string;
  s.slice(x1,x2);
  
  if (x2 != -1)
    return s.slice(x1,x2);
  else
    return s.slice(x1);
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
  
  this.downcase = downcase;
  this.get = string_get;
  this.gsub = gsub;    
  this.length = 0  
  this.range = string_range;
  this.range3 = string_range3;
  this.set = string_set;
  this.slice = string_slice;
  this.split = split;
  this.sub = sub;
  this.to_s = string_to_s;
  this.upcase = upcase;  
  this.string = String(s);
  this.length = this.string.length;
}

function enum_each(f){  for(x in this.enumerable) f(x); }

function enum_map(f){
  if (typeof f != 'function') return this;
  
  var a = [];
  this.each( function(x){ a.push(f(x)); } );
  this.last_method = 'map';
  return new rb.Array(a);
}

function rbEnumerable(raw_object){
    
  this.each = enum_each;
  this.enumerable = {};
  for(x in raw_object) {this.enumerable[x] = raw_object[x]};
}

function rbFixnum(val){
  this.num = val;
  //fixnum_num
}

function functionName(object){
  rawName = object.constructor.toString().slice(9);
  pos = rawName.indexOf('(',0);
  return new rb.String(rawName.slice(0, pos));
}

function rbType(datatype){
  rtype = {String: 'String', Array: 'Array', Number: 'Fixnum'};
  return rtype[functionName(datatype)];  
}

rb = {  Array: rbArray, String: rbString, Range: rbRange, 
        Hash: rbHash, Enumerable: rbEnumerable, Fixnum: rbFixnum,
        Object: rbObject
     }

// Ruby Object methods

function object_methods(){
  var a = [];
  for (x in this){a.push(x);}
  return new rb.Array(a);
}

function object_class(){ functionName(this).range(2,-1); }

function rbObject(){
  this.methods = object_methods;
  this.public_methods = object_methods;
  this.class = object_class;
}

// add the object methods into each object

// clone the rb object list and reject Object
/*
for (objName in rb) {
  rb[objName].prototype['methods'] = methods;
  rb[objName].prototype['public_methods'] = methods;
}
*/
function puts(s){console.log(s);}

var a = new rb.Array([3,5,7,2,78,1]);
var h = new rb.Hash({fun: 'rwe', colour: 'rtf'})
a.detect(function(x){ return x > 5;})
