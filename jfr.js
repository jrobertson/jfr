// file: jfr.js

// global variables

$apos = '';      // stores the post_match from a regex.
$backtick = '';  // store the pre_match from a regex.
$tilde = null;   // return the matchdata object from a regex

function range_each(f){ o(this.array).each(f); }

function step(gap, f){  
  var a = [];
  for (var i = 0; i < this.array.length; i = i + gap) a.push(this.array[i]);  
  if (typeof f == 'undefined') {
    return rb.Enumerator.new(o(a), this.inspect() + ':step(' + gap + ')');
  }
  else  o(a).each(f);
}

function range_to_a(){  return o(this.array);}

function rbRange(x1,x2){  
  this.custom_each = range_each;
  this.inspect = function(){ return x1 + '..' + x2;};
  this.step = step;  
  this.array = [];
  for (var i = x1; i < x2; i++) this.array.push(i);
}


function fixnum_chr(code){
  return String.fromCharCode(this.num);
}

function fixnum_inspect(){  return this.to_s(); }
function fixnum_to_f(){ return parseFloat(this.num); }
function fixnum_to_i(){ return parseInt(this.num); }
function fixnum_to_n(){ return this.num; }
function fixnum_to_s(){ return this.num.toString(); }
function fixnum_times(){
  e = rb.Range.new(0,this.num);
  e.desc = '#<Enumerator: ' + this.num + ':times>';
  return e;
}


function rbFixnum(val){
  this.chr = fixnum_chr;
  this.inspect = fixnum_inspect;
  this.num = val;
  this.to_f = fixnum_to_f;
  this.to_i = fixnum_to_i;
  this.to_s = fixnum_to_s;
  this.times = fixnum_times;
}


// Ruby Object methods

function object_is_a(name){
  return (this.class().to_s() == name);
}

function object_methods(){
  var a = [];
  for (x in this){a.push(':' + x);}
  return rb.Array.new(a);
}

function object_respond_to(raw_method){
  var method = (raw_method[0] != ':') ? ':' + raw_method : raw_method;
  return this.public_methods().include(method);
}

function object_class(){ return functionName(this).sub(/^rb/,''); }

function rbObject(){
  this.is_a = object_is_a;
  this.methods = object_methods;
  this.public_methods = object_methods;
  this.respond_to = object_respond_to;
  this.class = object_class;
}

function matchdata_captures(){  return this.rb_array; }
function matchdata_to_s(){ return this.found_string; }
function matchdata_inspect(){ 
  items = this.captures().map().with_index(function(x,i){
    return (i+1) + ':' + o(34).chr() + x + o(34).chr();
  }).join(' ').to_s();
  return "#<MatchData " + o(34).chr() + this.found_string + o(34).chr()
    + " "  + items + ">";
}

function rbMatchData(a){
  this.regexp = null;
  this.captures = matchdata_captures;
  this.inspect = matchdata_inspect;
  this.post_match = '';  
  this.pre_match = '';
  this.found_string = '';
  this.string = '';
  this.to_s = matchdata_to_s;
  this.rb_array = a;  
}

function sec(){ return new Date().getSeconds(); }
function min(){ return new Date().getMinutes(); }
function hour(){ return new Date().getHours(); }
function day(){ return new Date().getUTCDate(); }
function month(){ return new Date().getMonth() + 1; }

function now_to_a(){
  return rb.Array.new([sec(), min(), hour(), day(), month(), year(), wday()]);
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
  var a = o([year(), month(), day(), hour(), min(), sec()]);    
  return o("%s-%s-%s %s:%s:%s").sprintf(a);
}

rbTime = {  now: time_now  }

function nil_to_s(){  return o(''); }
function nil_to_a(){  return o([]); }
function nil_to_i(){  return o(0); }
function nil_to_f(){  return o(0.0); }
function nil_inspect(){ return 'nil';}

function rbNilClass() { 
  this.null = 'nil';
  this.to_s = nil_to_s;
  this.to_a = nil_to_a;
  this.to_i = nil_to_s;
  this.to_f = nil_to_f;
  this.inspect = nil_inspect;
}

function random_rand(upper){
  return Math.floor(Math.random()*upper);
}

function rbRandom(seed){
  this.rand = random_rand;
}

function proc_call(){ return this.f()}
function proc_to_s(){ return this.f.toString(); }

function rbProc(f){
  this.f = f;
  this.to_s = proc_to_s;
  this.call = proc_call;
}
// -------------------------


function functionName(object){
  if (typeof object == 'undefined') return new rbSys.String('');
  var rawName = object.constructor.toString().slice(9);
  var pos = rawName.indexOf('(',0);
  return new rbSys.String(rawName.slice(0, pos));
}

function rbType(datatype){
  var rtype = {String: 'String', Array: 'Array', Number: 'Fixnum', 
    Object: 'Hash', Function: 'Proc'};
  return rtype[functionName(datatype).to_s()];  
}

// equivalent to Hash[]

function array_to_hash(a){
  var h = {};
  a.each(function(x){ h[x.first().to_n()] = x.last().to_n(); });
  return o(h);
}

function Hash(obj){
  var h = {};  
  if (typeof obj == 'undefined') return o({});
  else {
    if (functionName(obj).to_s() != 'rbArray')
      a = o(o(arguments).values().each_slice(2).to_a());
    else a = obj;
    return array_to_hash(a);
  }
}


// automatically creates a ruby object from a native object
function o(datatype){
  return (typeof datatype != 'undefined' && 
    datatype.constructor.toString().slice(9,11) != 'rb') 
      ? new rbSys[rbType(datatype)](datatype) : datatype;
}

// equivalent to %w
function pw(raw_o){
  a = new rbSys.String(raw_o).split(/\s/).select(function(x){
    return (x.to_s().length > 0);
  });
  return a;
}

function puts(s){console.log(s);}

function rand(upper){ return rb.Random.new().rand(upper); }
function rbEval(){
  
}

function sleep(seconds, f){ setTimeout(f, seconds * 1000); }
function sortNumber(a,b) {return a - b;}

function sortNestedNumber(a, b){ 
  return o(a.first().to_s().toString()).ord() - o(b.first().to_s().toString()).ord(); 
}

// -------------------------


rbSys = {  Array: rbArray, String: rbString, Range: rbRange, 
        Hash: rbHash, Enumerable: rbEnumerable, Fixnum: rbFixnum,
        Object: rbObject, MatchData: rbMatchData, Time: rbTime,
        NilClass: rbNilClass, Enumerator: rbEnumerator, Random: rbRandom,
        Proc: rbProc
     }

        //
// add the object methods into each object

// clone the rb object list and reject Object, and Time
rbList = new rbSys.Hash(rbSys);
//o(['])a
//pw('Object Time nilClass').each(function(x){ rbList.delete(x);});
rbList.delete('Object');
rbList.delete('Time');
//rbList.delete('NilClass');

rbSys.Array.prototype.each = enumerable_each;
rbSys.Array.prototype.select = enumerable_select;

nil = new rbNilClass;

rbList.keys().each(function(class_key) {
  new rbSys.Hash(new rbSys.Object).each_pair(function(method_key, method_val){
    rbSys[class_key.to_s()].prototype[method_key] = method_val.f;
  });
});

new rbSys.Array(['Array', 'Hash', 'Range', 'Enumerator']).each(function(class_name){
  new rbSys.Hash(new rbSys.Enumerable).each_pair(function(method_key, method_val){
    rbSys[class_name.to_s()].prototype[method_key] = method_val.f;
  });
});



rbArrayObj = {new: function(x,y){return new rbSys.Array(x,y)}};
rbStringObj = {new: function(s){return new rbSys.String(s)}};
rbRangeObj = {new: function(x1,x2){return new rbSys.Range(x1,x2)}};
rbHashObj = {new: function(hparam){return new rbSys.Hash(hparam)}};
rbObjectObj = {new: function(){return new rbSys.Object()}};
rbEnumeratorObj = {new: function(x, desc){return new rbSys.Enumerator(x, desc)}};
rbRandomObj = {new: function(seed){return new rbSys.Random(seed)}};

rb = {  Array: rbArrayObj, String: rbStringObj, Range: rbRangeObj, 
        Hash: rbHashObj, Enumerable: rbEnumerable, Fixnum: rbFixnum,
        Object: rbObjectObj, MatchData: rbMatchData, Time: rbTime,
        NilClass: rbNilClass, Enumerator: rbEnumeratorObj, Random: rbRandomObj
     }

