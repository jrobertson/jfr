// file: jfr.js

function each(f){
  for (i = 0; i < this.array.length; i++) {f(this.array[i]);}
}

function set(index, value){
  this.array[index] = value;
  this.length = this.array.length;
}

function get(index){ return this.array[index]; }

function reverse(){  return this.array.reverse();}
function sort(){  return this.array.sort();}
function array_to_a(){  return this.array;}

function rbArray(i, obj){

  if (typeof i == 'undefined') this.array = new Array;
  else {
    if (functionName(i) == 'Array') {
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
  this.set = set;
  this.get = get;
  this.each = each;
  this.reverse = reverse;
  this.sort = sort;
  this.to_a = array_to_a;
}

function to_a(){
  var a = new rb.Array();
  for (i = this.x1; i <= this.x2; i++) {a.set(i,i);}
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

  s = this.string;
  s.slice(x1,x2);

  if (x2 != -1)
    return s.slice(x1,x2+1);
  else
    return s.slice(x1)
}

function string_range3(x1, x2) {

  s = this.string;
  s.slice(x1,x2);
  
  if (x2 != -1)
    return s.slice(x1,x2);
  else
    return s.slice(x1)
}


function string_slice(x1,x2){

  s = this.string;
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
  this.slice = slice;
  this.split = split;
  this.sub = sub;
  this.to_s = string_to_s;
}

rb = {  Array: rbArray, String: rbString, Range: rbRange}

