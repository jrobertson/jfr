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
  return rtype[functionName(datatype).to_s()];  
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

function matchdata_captures(){
  return this.rb_array; 
}

function rbMatchData(a){
  this.regexp = null;
  this.captures = matchdata_captures;
  this.post_match = '';  
  this.pre_match = '';  
  this.rb_array = a;  
}

rb = {  Array: rbArray, String: rbString, Range: rbRange, 
        Hash: rbHash, Enumerable: rbEnumerable, Fixnum: rbFixnum,
        Object: rbObject, MatchData: rbMatchData
     }

// add the object methods into each object

// clone the rb object list and reject Object
rbList = new rb.Hash(rb)
rbList.delete('Object');

rbList.each(function(class_key,v) {
  new rb.Hash(new rb.Object).each(function(method_key, method_val){
    rb[class_key].prototype[method_key] = method_val;
  });
});


function puts(s){console.log(s);}

//var a = new rb.Array([3,5,7,2,78,1]);
//var h = new rb.Hash({fun: 'rwe', colour: 'rtf'});
//h.values_at(['fun', 'colour']);
//a.detect(function(x){ return x > 5;})

//h.reject(function(k,v){ return v == 'rtf';});
//h.delete('fun');
//s = new rb.String("food foraging");
//s.scan(/fo/);