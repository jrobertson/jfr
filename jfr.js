// file: jfr.js

// global variables


$apos = ''      // stores the postmatch from a regex.
$backtick = ''  // store the prematch from a regex.
$tilde = null   // return the matchdata object from a regex

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


// Ruby Object methods

function object_is_a(name){
  return this.class().to_s() == name
}

function object_methods(){
  var a = [];
  for (x in this){a.push(x);}
  return new rb.Array(a);
}

function object_respond_to(method){
  return this.public_methods().include(method);
}

function object_class(){ return functionName(this).range(2,-1); }

function rbObject(){
  this.is_a = object_is_a;
  this.methods = object_methods;
  this.public_methods = object_methods;
  this.respond_to = object_respond_to;
  this.class = object_class;
}

function matchdata_captures(){  return this.rb_array; }
function matchdata_to_s(){ return this.string; }
function matchdata_inspect(){ return this.class() + ' ' + this.string;}

function rbMatchData(a){
  this.regexp = null;
  this.captures = matchdata_captures;
  this.inspect = matchdata_inspect;
  this.post_match = '';  
  this.pre_match = '';
  this.string = '';
  this.to_s = matchdata_to_s;
  this.rb_array = a;  
}

function sec(){ return new Date().getSeconds(); }
function min(){ return new Date().getMinutes(); }
function hour(){ return new Date().getHours(); }
function day(){ return new Date().getDay(); }
function month(){ return new Date().getMonth(); }

function now_to_a(){
  return new rb.Array([sec(), min(), hour(), day(), month(), year(), wday()]);
}

function now_to_s(){
  
}

function wday(){ return new Date().getUTCDay(); }
function yday(){ return ''; }
function year(){ return new Date().getFullYear(); }


rbNow = {
  wday: wday,
  sec: sec,
  min: min,
  hour: hour,
  day: day,
  mday: day,
  mon: month,
  month: month,
  to_a: now_to_a,
  to_s: now_to_s,
  year: year
}

function time_now(){
  // the format we want 2011-09-23 16:45:51 +0100
  /*var a = new rb.Array;
  a.push(new Date().getFullYear();)*/
  
  return rbNow;
}

rbTime = {
  now: time_now
  
}

// -------------------------

function functionName(object){
  rawName = object.constructor.toString().slice(9);
  pos = rawName.indexOf('(',0);
  return new rb.String(rawName.slice(0, pos));
}

function rbType(datatype){
  rtype = {String: 'String', Array: 'Array', Number: 'Fixnum'};
  return rtype[functionName(datatype).to_s()];  
}

function Hash(a){
  return a.inject({},function(r,x){ 
    return r.merge([x.first(), x.last()]); 
  });  
}

function o(datatype){
  return new rb[rbType(datatype)](datatype);
}

function puts(s){console.log(s);}
function rbEval(){
  
}

function sleep(seconds, f){ setTimeout(f, seconds * 1000); }


// -------------------------

rb = {  Array: rbArray, String: rbString, Range: rbRange, 
        Hash: rbHash, Enumerable: rbEnumerable, Fixnum: rbFixnum,
        Object: rbObject, MatchData: rbMatchData, Time: rbTime
     }

// add the object methods into each object

// clone the rb object list and reject Object, and Time
rbList = new rb.Hash(rb)
rbList.delete('Object');
rbList.delete('Time');

rbList.each(function(class_key,v) {
  new rb.Hash(new rb.Object).each(function(method_key, method_val){
    rb[class_key].prototype[method_key] = method_val;
  });
});



//s = new rb.String("a1, a2 = 'funk', 'pu = nk'");
//r = s.split('=',2)

