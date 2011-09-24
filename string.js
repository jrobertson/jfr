// file: string.js


function string_concat(string){
  this.string = this.string.concat(string);
  return this;
}

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

function sub_p(pattern, newString) {
  this.string = this.string.replace(pattern, newString);
  return this;
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

function string_length(){return this.string.length;}
function string_index(pattern){ return this.string.search(pattern); }

function string_match(rawPattern){

  if (functionName(rawPattern).to_s() == 'RegExp') {
    var pattern = rawPattern.toString().slice(1, -1);
  }  
  var regex = new RegExp(pattern);
  
  var rawMatch = this.string.match(regex);
  var aMatch = new rb.Array(rawMatch);
  var stringMatch = aMatch.shift();
  var matchdata = new rb.MatchData(aMatch);
  matchdata.string = stringMatch;
  matchdata.regexp = regex;
  var rbString = new rb.String(stringMatch);
  
  matchdata.string = rbString;
  matchdata.pre_match = rawMatch['index'] > 0 ? 
    rbString.range(0, rawMatch['index'] - 1) : new rb.String('');
  matchdata.post_match = rbString.range(rawMatch['index'] + 
  stringMatch.length, -1);
  return matchdata;
}

function string_sprintf(a){
  a.each(function(x){
    s.sub_p("%s", x);
  });
  return this;
  
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

function string_regex(pattern,index){
  
  var matchdata = this.match(pattern);
  
  if (typeof index == 'undefined'){
    return matchdata.to_s();
  }
  else {
    return matchdata.captures().at(index - 1);
  }
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
  
  this.concat = string_concat;
  this.downcase = downcase;
  this.get = string_get;
  this.gsub = gsub;
  this.index = string_index;
  this.match = string_match;
  this.range = string_range;
  this.range3 = string_range3;
  this.regex = string_regex;
  this.scan = string_scan;
  this.set = string_set;
  this.slice = string_slice;
  this.split = split;
  this.sprintf = string_sprintf;
  this.sub = sub;
  this.sub_p = sub_p;
  this.to_s = string_to_s;
  this.upcase = upcase;  
  this.string = String(s);
  this.length = string_length;
}
