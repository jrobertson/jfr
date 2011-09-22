// file: string.js


function string_scan(rawPattern){
  
  if (functionName(rawPattern).to_s() == 'RegExp') {
    pattern = rawPattern.toString().slice(1, -1);
  }  
  regex = new RegExp(pattern, 'g');
  return new rb.Array(this.string.match(regex));
}

function string_set(v) { this.string = v; }
function string_get()  { return this.string; }
function upcase()   { return this.string.toUpperCase(); }
function downcase() { return this.string.toLowerCase(); }

function split(pattern){ return this.string.split(pattern);}

function sub(pattern, newString) {
  s = new String(this.string);
  return s.replace(pattern, newString);
}

function gsub(rawPattern, newString) {

  s = new String(this.string);
  pattern = rawPattern;

  if (functionName(rawPattern).to_s() == 'RegExp') {
    pattern = rawPattern.toString().slice(1, -1);
  }

  regex = new RegExp(pattern, 'g');
  return s.replace(regex, newString);
}

function string_match(rawPattern){

  if (functionName(rawPattern).to_s() == 'RegExp') {
    var pattern = rawPattern.toString().slice(1, -1);
  }  
  var regex = new RegExp(pattern);
  
  var rawMatch = this.string.match(regex);
  var aMatch = new rb.Array(rawMatch);
  var stringMatch = aMatch.shift();
  var matchdata = new rb.MatchData(aMatch);  
  matchdata.regexp = regex;
  var rbString = new rb.String(this.string);
  
  matchdata.string = rbString;
  matchdata.pre_match = rawMatch['index'] > 0 ? 
    rbString.range(0, rawMatch['index'] - 1) : new rb.String('');
  matchdata.post_match = rbString.range(rawMatch['index'] + 
  stringMatch.length, -1);
  return matchdata;
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

function string_regex(){
  this.scan();
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
  this.length = 0;
  this.match = string_match;
  this.range = string_range;
  this.range3 = string_range3;
  this.regex = string_regex;
  this.scan = string_scan;
  this.set = string_set;
  this.slice = string_slice;
  this.split = split;
  this.sub = sub;
  this.to_s = string_to_s;
  this.upcase = upcase;  
  this.string = String(s);
  this.length = this.string.length;
}
