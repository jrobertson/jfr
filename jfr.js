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
function to_a(){  return this.array;}

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
  this.to_a = to_a;
}

function set(v) { this.string = v; }
function get()  { return this.string; }
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

function to_s(){return this.string;}

function rbString(s){

  this.string = String(s);
  this.length = 0;
  this.set = set;
  this.get = get;
  this.gsub = gsub;
  this.upcase = upcase;
  this.downcase = downcase;
  this.split = split;
  this.sub = sub;
  this.to_s = to_s;
}

rb = {  Array: rbArray, String: rbString}

