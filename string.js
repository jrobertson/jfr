// file: string.js


function string_chr(){  return this.string.charAt(0); }
function string_clone(){  return o(this.string); }

function string_concat(obj){
  
  this.string = this.string.concat(obj.string);
  return this;
}

function downcase() { return this.string.toLowerCase(); }
function string_get()  { return this.string; }

function gsub_base_inner(s2, rawPattern, unknown) {
  return s2.sub_p(rawPattern, unknown);
}

function gsub_base(s2, rawPattern, unknown) {
  
  if (typeof unknown != 'undefined') {
    /*while (s2.regex(rawPattern) != nil) {
      gsub_base_inner(s2, rawPattern, unknown);
    }*/
    var s = s2.split;
    s2.scan(rawPattern).each(function(x){
      gsub_base_inner(s2, x, unknown);
      
      puts ('s2 : '  + s2.to_s());
    });
    return s2;

  }
  else {
    a = s2.scan(rawPattern);
    var desc = ' ' + o(34).chr() + '  ' +  o(34).chr() + ':' + 
      'gsub(' + rawPattern.toString() + ')';
    //enumerator = new rb.Enumerator(s2, a, gsub_base_inner, desc);
    enumerator = new rbEnumerator(this, desc);
    return enumerator;
  }
  
}

function gsub(rawPattern, newString) {
  
  return gsub_base(this.clone(), rawPattern, newString);

}

function gsub_p(rawPattern, newString) {
  
  return gsub_base(this, rawPattern, newString);

}

function string_index(pattern){ return this.string.search(pattern); }
function string_inspect() { return this.string;}
function string_length(){return this.string.length;}

function string_match(rawPattern){

  var pattern = rawPattern;
  
  if (functionName(rawPattern).to_s() == 'RegExp') {
    var pattern = rawPattern.toString().slice(1, -1);
  }
  
  var regex = new RegExp(pattern);  
  var rawMatch = this.string.match(regex);

  if (rawMatch == null) return nil;
  
  var aMatch = o(rawMatch);
  var stringMatch = aMatch.shift();
  var matchdata = new rbSys.MatchData(aMatch);
  matchdata.found_string = stringMatch;
  matchdata.regexp = regex;
  var rbString = o(this.string);
  
  matchdata.string = rbString;
  matchdata.pre_match = rawMatch['index'] > 0 ? 
    rbString.range(0, rawMatch['index'] - 1) : o('');
  matchdata.post_match = rbString.range(rawMatch['index'] + 
  stringMatch.length, -1);
  $apos = matchdata.post_match;
  $backtick = matchdata.pre_match;
  $tilde = matchdata;
  return matchdata;
}

function string_ord(){
  return this.string.charCodeAt(0);
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
    
  return o(r);
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
  if (matchdata == nil) return nil;
  if (typeof index == 'undefined'){
    return o(matchdata.to_s());
  }
  else {
    return o(matchdata.captures().at(index - 1));
  }
}

function scanx(r, pattrn, s){
  var m = s.match(pattrn);
  if (m != nil){
    r.push((m.captures().length() < 1) ? m.found_string : m.captures().array);
    scanx(r, pattrn, m.post_match);
  }
}

function string_scan(rawPattern, f){    
  
  var r = []; 
  scanx(r, rawPattern, this); 
  
  if (f) { o(r).each(f); }

  return o(r);

}

function string_set(v) { this.string = v; }

function string_split(rawPattern, i){
  
  var result = new rbSys.Array();
  
  if (typeof i == 'undefined') 
    result = o(this.string.split(rawPattern));
  else {
    a = o(this.string.split(rawPattern));
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
    xx = s2.regex(regex);
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
  if (typeof x1 == 'undefined') return nil

  if (typeof x2 == 'undefined') {
    return s.slice(x1, x1+1);
  }
  else {
    if (x2 > x1) return s.slice(x1, x2);
    else return x2 < 0 ? nil : ''
  }
}

function string_to_s(){return this.string;}
function upcase()   { return this.string.toUpperCase(); }

function rbString(s){
  
  this.chr = string_chr;
  this.clone = string_clone;
  this.concat = string_concat;
  this.downcase = downcase;
  //this.enum = new rb.Enumerable();
  this.get = string_get;
  this.gsub = gsub;
  this.gsub_p = gsub_p;
  this.index = string_index;
  this.inspect = string_inspect;
  this.match = string_match;
  this.ord = string_ord;
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
