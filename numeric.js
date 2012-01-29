// file: numeric.js

function fixnum_chr(code){
  return o(String.fromCharCode(this.num));
}

function fixnum_inspect(){  return this.to_s(); }
function fixnum_to_f(){ return parseFloat(this.num); }
function fixnum_to_i(){ return parseInt(this.num); }
function fixnum_to_s(){ return this.num.toString(); }

function rbFixnum(val){
  this.chr = fixnum_chr;
  this.inspect = fixnum_inspect;
  this.num = parseInt(val);
  this.to_f = fixnum_to_f;
  this.to_i = fixnum_to_i;
  this.to_s = fixnum_to_s;
}

function float_inspect(){  return this.num; }
function float_to_f(){ return parseFloat(this.num); }
function float_to_i(){ return parseInt(this.num); }
function float_to_s(){ return this.num.toString(); }


function rbFloat(val){
  this.inspect = float_inspect;
  this.num = parseFloat(val);
  this.to_f = float_to_f;
  this.to_i = float_to_i;
  this.to_s = float_to_s;
}

function numeric_eql_q(val){  if (val != nil) return this.to_n() == val.to_n(); }
function numeric_to_n(){ return this.num; }

function rbNumeric(val){
  this.eql_q = numeric_eql_q;
  this.to_n = numeric_to_n;
}

function integer_to_i(){ return parseInt(this.num); }

function integer_times(f){
  if (typeof f == 'undefined') {
    var desc = this.inspect() + ':times';
    var new_a = o(rb.Range.new(0,this.num).to_a());
    new_a.last_method = 'each';
    return rb.Enumerator.new(new_a, desc);    
  }
  else {
    rb.Range.new(0,this.num).each(f);
  }
}

function rbInteger(val){
  this.to_i = integer_to_i;  
  this.times = integer_times;
}

// -------------------------


