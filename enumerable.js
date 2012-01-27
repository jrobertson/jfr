// file: enumerable.js

function enumerable_count(){  
  if (this.respond_to('size')) return this.size();
  else {
    this.each();
    return this.temp_array.length;
  }
}

function enumerable_detect(f){  
  var r = [], bFlag = false, i = 0;    
  do { 
    if (f(this.temp_array[i]) == true) {
      r = this.temp_array[i];
      bFlag = true;
    }
    i++;
  }  while (bFlag == false && i < this.temp_array.length)  
  type = rbType(r);
  return type ? rb[type].new(r) : r;
}

function enumerable_each(f){  
  
  if (typeof f == 'undefined') {  
    var desc = this.inspect() + ':each';
    this.temp_array = this.to_a();
    return new rbSys.Enumerator(this, desc);
  }  
  else {
    this.array = o(this.custom_each(f)); 
    return this;
  }  
}

function enumerable_each_with_index(f){  
 
  if (typeof f == 'undefined') {
    
    var enumx = this.each().with_index();
    var desc = this.inspect() + ':each_with_index';
    return new rbSys.Enumerator(enumx, desc);
    
  }  
  else {
    
    var a = [];
    for (var i = 0; i < this.temp_array.length; i++) {
      a.push(f(this.temp_array[i], i));
    }    
    this.array = o(a);
    return this;
  }  
}

function enumerable_each_slice(gap,f){
  var a = this;  
  if (typeof f == 'undefined') {    
    var a2 = rb.Range.new(0, a.length()).step(gap).map(function(obj_i){ 
      var i = obj_i.to_i();
      return o((i + 1 < a.length()) ? 
        [a.at(i).to_n(), a.at(i+1).to_n()] : [a.at(i).to_n()]);
    });
    return rb.Enumerator.new(a2, this.inspect() + ':each_slice(' + gap + ')');
  }
  else {
    this.temp_array = rb.Range.new(0, a.length()).step(gap).map(function(obj_i){ 
      var i = obj_i.to_i();
      return f((i + 1 < a.length()) ? 
        [a.at(i).to_n(), a.at(i+1).to_n()] : [a.at(i).to_n()]);
    });    
  }
}

function enumerable_each_cons(increment, f){
  var obj_a = o(this.temp_array);
  if (typeof f == 'undefined') {
    var a = obj_a.range(0,-2).map().with_index(function(x,i){ 
      return obj_a.range(i, i + increment - 1);
    });
    var desc = this.inspect() + ':each_cons(' + increment + ')';
    this.temp_array = a.to_a();
    this.last_method = 'each';
    return rb.Enumerator.new(this, desc);
  }
  else {
    obj_a.range(0,-2).each().with_index(function(x,i){ 
      f(obj_a.range(i, i + increment - 1));
    });    
  }
}

function enumerable_find_index(val){
  var r = this.map().with_index().detect(function(x){ 
    return x.first().eql_q(val); 
  });
  return r.length() > 0 ? r.last() : nil;
}

function enumerable_first(){
  this.each();
  return this.temp_array[0];
}

// e.g. a2.inject({},function(r,x){ return r.merge(Hash(x.first(),x.last())); });
function enumerable_inject(arg, f){
  var rtype = {String: arg, Object: new rbHash(), Array: new rbArray(arg), Number: arg};
  var result = rtype[functionName(arg).to_s()];
  this.each(function(x){ result = f(result, x) });

  return result;
}

function enumerable_map(f){
  if (typeof f == 'function') {
    this.each( function(x){ return f(x); } );
    return this.array;
  }  
  else {
    var desc = this.inspect() + ':map';
    this.temp_array = this.to_a();
    this.last_method = 'map';
    var enumerator = new rbEnumerator(this, desc);
    return enumerator;      
  }  
}

function enumerable_max(){ return o(this.sort()).last();}
function enumerable_min(){ return o(this.sort()).first();}

function enumerable_minmax(){
  var a = this.sort();
  return o([o(a).first(), o(a).last()]);
}

function enumerable_reject(f){
  return this.select(function(x){
    return !f(x);
  });
}

function enumerable_select(f){  
  var r = [];
  this.each(function(x){ if (f(x) == true) r.push(x); });
  return o(r);
}
function enumerable_sort(){ 
  this.each();
  var a = this.temp_array;
  var a2 = [];
  for (var i = 0; i < a.length; i++){ a2.push(a[i].array); }  
  if (functionName(a2[0]).to_s() == 'Array') {
    var sorted = (functionName(a2[0][0]).to_s() == 'String') ? a2.sort() : a2.sort(sortNumber);
    return sorted;
  }
  return a.sort();
}
function enumerable_sort_by(f){
  var a2 = this.map().with_index(function(x,i) {
    raw_val = f(x);
    val = isNaN(raw_val) ? raw_val.to_s() : raw_val;
    return [val,i];
  }).to_a();
  var a3 = a2.sort(sortNestedNumber);
  var a = this.to_a();  
  if (this.is_a('Hash')) {
    return o(a3).inject({},function(r,x){ 
      var y = a[x.last()];  return r.merge( Hash(y.first().to_s(), y.last().to_s()) ); 
    });
  }
  else {  
    var r = o(a3).map(function(x){  return a[x.last().to_s()];  });  
    return r;
  }  
}

function enumerable_to_a(){  
  return this.custom_each(function(x){return x});
}

function rbEnumerable(s){
  this.count = enumerable_count;
  this.each = enumerable_each;
  this.each_cons = enumerable_each_cons;
  this.each_with_index = enumerable_each_with_index;
  this.detect = enumerable_detect;
  this.each_slice = enumerable_each_slice;
  this.find_index = enumerable_find_index;
  this.first = enumerable_first;
  this.inject = enumerable_inject;  
  this.map = enumerable_map;
  this.collect = enumerable_map;
  this.max = enumerable_max;
  this.min = enumerable_min;  
  this.minmax = enumerable_minmax;
  this.reject = enumerable_reject;
  this.select = enumerable_select;
  this.sort = enumerable_sort;
  this.sort_by = enumerable_sort_by;
  this.to_a = enumerable_to_a;
}