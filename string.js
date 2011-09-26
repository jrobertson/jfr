// file: string.js


function string_clone(){
  return new rb.String(this.string);  
}

function string_concat(obj){
  this.string = this.string.concat(obj.string);
  return this;
}

function downcase() { return this.string.toLowerCase(); }
function string_get()  { return this.string; }

function gsub(rawPattern, newString) {
  
  var s2 = this.clone();
  
  while (s2.regex(rawPattern) != nil) {
    s2.sub_p(rawPattern, newString);
  }
  
  return s2;
}


function string_index(pattern){ return this.string.search(pattern); }
function string_inspect() { return this.string;}
function string_length(){return this.string.length;}

function string_scan(rawPattern){
  
  if (functionName(rawPattern).to_s() == 'RegExp') {
    var pattern = rawPattern.toString().slice(1, -1);
  }  
  var regex = new RegExp(pattern, 'g');
  return new rb.Array(this.string.match(regex));
}

function string_set(v) { this.string = v; }
function upcase()   { return this.string.toUpperCase(); }

function string_match(rawPattern){

  var pattern = rawPattern;
  
  if (functionName(rawPattern).to_s() == 'RegExp') {
    var pattern = rawPattern.toString().slice(1, -1);
  }
  
  var regex = new RegExp(pattern);  
  var rawMatch = this.string.match(regex);

  if (rawMatch == null) return nil;
  
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

function string_prepend(val){
  this.string = val.concat(this.string);
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
  if (matchdata == nil) return nil
  if (typeof index == 'undefined'){
    return matchdata.to_s();
  }
  else {
    return matchdata.captures().at(index - 1);
  }
}

function string_split(rawPattern, i){
  
  var result = rb.Array();
  
  if (typeof i == 'undefined') 
    result = new rb.Array(this.string.split(rawPattern));
  else {
    a = new rb.Array(this.string.split(rawPattern));
    //a2 = a.slice_p(0,i-1).join();
    a2 = a.slice_p(0,i-1);
    
    pattern = rawPattern;
    
    if (functionName(rawPattern).to_s() == 'RegExp') {
      pattern = rawPattern.toString().slice(1, -1);
    }      
    
    result = a2.concat(a.join(pattern));

  }
  
  return result;
}

function sub_replace(s2, rawPattern, unknown){
  var pattern = rawPattern;

  if (functionName(rawPattern).to_s() == 'RegExp') {
    pattern = rawPattern.toString().slice(1, -1);
  }

  var regex = new RegExp(pattern);
  
  if (functionName(unknown).to_s() == 'Function') {
    xx = s2.regex(regex).to_s();
    f = unknown;
    newString = f(xx);
  }
  else
    newString = unknown;
    
  s2.string = s2.string.replace(regex, newString);
  return s2;
}

function sub(rawPattern, unknown) {  
  return sub_replace(this.clone(), rawPattern, unknown);
}

function sub_p(rawPattern, unknown) {
  return sub_replace(this, rawPattern, unknown);
}

function string_sprintf(a){
  var s = this;
  var pattrn = '%s';
  a.each(function(x){
    sub_p.apply(s,[pattrn, x]);
  });
  return this;
  
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
  
  this.clone = string_clone;
  this.concat = string_concat;
  this.downcase = downcase;
  this.get = string_get;
  this.gsub = gsub;
  this.index = string_index;
  this.inspect = string_inspect;
  this.match = string_match;
  this.prepend = string_prepend;
  this.range = string_range;
  this.range3 = string_range3;
  this.regex = string_regex;
  this.scan = string_scan;
  this.set = string_set;
  this.slice = string_slice;
  this.split = string_split;
  this.sprintf = string_sprintf;
  this.sub = sub;
  this.sub_p = sub_p;
  this.to_s = string_to_s;
  this.upcase = upcase;  
  this.string = String(s);
  this.length = string_length;
}
