// file: jfr.js

// global variables

$apos = '';      // stores the post_match from a regex.
$backtick = '';  // store the pre_match from a regex.
$tilde = null;   // return the matchdata object from a regex

function range_each(f){ o(this.temp_array).each(f); }

function step(gap, f){  
  var a = [];
  for (var i = 0; i < this.temp_array.length; i = i + gap) a.push(this.temp_array[i]);  
  if (typeof f == 'undefined') {
    return rb.Enumerator.new(o(a), this.inspect() + ':step(' + gap + ')');
  }
  else  o(a).each(f);
}

function range_to_a(){  return o(this.temp_array);}

function rbRange(x1,x2){  
  this.custom_each = range_each;
  this.inspect = function(){ return x1 + '..' + x2;};
  this.step = step;  
  this.temp_array = [];
  this.to_a = range_to_a;
  for (var i = x1; i < x2; i++) this.temp_array.push(i);
}


// Ruby Object methods

function object_is_a(name)   {  return (this.class().to_s() == name); }
function object_method(label){  return new rbSys.Method(this, label); }

function object_methods(){
  return rb.Hash.new(this).keys().map(function(x){return ':' + x.to_s();});
}

function object_respond_to(raw_method){
  var method = (raw_method[0] != ':') ? ':' + raw_method : raw_method;
  return this.public_methods().include(method);
}

function object_send(method_name){
  return this.method(method_name).call();
}

function object_to_enum(raw_method){
    var desc = this.inspect() + ':each';
    this.temp_array = this.to_a();
    this.last_method = 'each';
    return rb.Enumerator.new(this, desc);

}

function object_class(){ return functionName(this).sub(/^rb/,''); }

function rbObject(){
  this.is_a = object_is_a;
  this.method = object_method;
  this.methods = object_methods;
  this.public_methods = object_methods;
  this.respond_to = object_respond_to;
  this.send = object_send;
  this.to_enum = object_to_enum; //still to do 05-01-2012
  this.class = object_class;
}

function matchdata_captures(){  return this.rb_array; }
function matchdata_to_s(){ return this.found_string; }
function matchdata_inspect(){ 
  items = this.captures().map().with_index(function(x,i){
    return (i+1) + ':' + x.inspect();
  }).join(' ').to_s();
  return "#<MatchData " + this.found_string.inspect() + " "  + items + ">";
}

function matchdata_values_at(){
  var a = this.rb_array.clone();
  a.unshift(this.found_string);
  return o(arguments).values().map(function(x){ 
    return a.at(x.to_i()); 
  });
}
//  
function rbMatchData(a){
  this.regexp = null;
  this.captures = matchdata_captures;
  this.inspect = matchdata_inspect;
  this.post_match = '';  
  this.pre_match = '';
  this.found_string = '';
  this.string = '';
  this.to_s = matchdata_to_s;
  this.values_at = matchdata_values_at;
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

function regexp_match(){
}
function rbRegExp() {
  this.match = regexp_match;
}

function random_rand(upper){
  return Math.floor(Math.random()*upper);
}

function rbRandom(seed){
  this.rand = random_rand;
}

function proc_call()   { return this.f();                     }
function proc_inspect(){ return '#<Proc:0x86b15f4@(irb):39>'; }
function proc_to_s()   { return this.f.toString();            }

function rbProc(f){
  this.f = f;
  this.to_s = proc_to_s;
  this.inspect = proc_inspect;
  this.call = proc_call;
}

function method_call(){ return this.obj[this.method_name]();}

function method_inspect(){
  return '#<Method: ' + this.obj.class().to_s() + '#' + 
    this.method_name + '>'  ;
}

function rbMethod(obj, method_name){
  
  this.method_name = method_name;
  this.inspect = method_inspect;
  this.obj = obj;
  this.call = method_call;
  
}

// -------------------------


function functionName(object){
  if (typeof object == 'undefined') return new rbSys.String('');
  var rawName = object.constructor.toString().slice(9);
  var pos = rawName.indexOf('(',0);
  return new rbSys.String(rawName.slice(0, pos));
}

function rbType(rawType){
  var rtype = {String: 'String', Array: 'Array', Number: 'Fixnum', 
    Object: 'Hash', Function: 'Proc', Float: 'Float'};
  type = functionName(rawType).to_s()
  if (type == 'Number' && parseInt(rawType) != rawType) type = 'Float';
  
  return rtype[type];  
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

function r(obj){
  objects = {String: 'to_s', Fixnum: 'to_i', Float: 'to_f'};
  return objects[obj.class().to_s()];
}

function rand(upper){ return rb.Random.new().rand(upper); }
function rbEval(){
  
}

function sleep(seconds, f){ setTimeout(f, seconds * 1000); }
function sortNumber(a,b) {return a - b;}

function sortNestedNumber(a, b){ 
  if (isNaN(a.first().to_s().toString())) {
    return o(a.first().to_s().toString()).ord() - o(b.first().to_s().toString()).ord();
  }
  else {
    return (a.first().to_i() - b.first().to_i());  
  }
}

function inheritXtoY(source, target) {
  new rbSys.Hash(new rbSys[source]).each_pair(function(method_key, method_val){
    rbSys[target].prototype[method_key] = method_val.f;
  });  
}

// -------------------------


rbSys = {  Array: rbArray, String: rbString, Range: rbRange, 
        Hash: rbHash, Enumerable: rbEnumerable, Fixnum: rbFixnum,
        Object: rbObject, MatchData: rbMatchData, Time: rbTime,
        NilClass: rbNilClass, Enumerator: rbEnumerator, Random: rbRandom,
        Proc: rbProc, RegExp: rbRegExp, Method: rbMethod, Float: rbFloat,
        Numeric: rbNumeric, Integer: rbInteger
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

new rbSys.Array(['Array', 'Hash', 'Range', 'Enumerator']).each(function(class){
  inheritXtoY('Enumerable', class.to_s());
});

inheritXtoY('Numeric', 'Integer');
inheritXtoY('Numeric', 'Float');
inheritXtoY('Integer', 'Fixnum');


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
        NilClass: rbNilClass, Enumerator: rbEnumeratorObj, Random: rbRandomObj,
        Float: rbFloat
     }

