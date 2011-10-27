// file: enumerable.js

function enumerable_count(){  
  if (this.respond_to('size')) return this.size();
  else {
    this.each();
    return this.temp_array.length;
  }
}

function enumerable_each(f){  
  if (typeof f == 'undefined') {  
    var desc = this.inspect() + ':each';
    this.temp_array = this.to_a();
    return new rbSys.Enumerator(this, desc);
  }  
  else {
    this.temp_array = o(this.custom_each(f)); 
    return this;
  }  
}

function enumerable_each_slice(gap,f){
  var a = this;  
  if (typeof f == 'undefined') {    
    var a2 = rb.Range.new(0, a.length()).step(gap).map(function(i){ 
      return o((i + 1 < a.length()) ? 
        [a.at(i), a.at(i+1)] : [a.at(i)]);
    });
    return rb.Enumerator.new(a2, this.inspect() + ':each_slice(' + gap + ')');
  }
  else {
    this.temp_array = rb.Range.new(0, a.length()).step(gap).map(function(i){ 
      return f((i + 1 < a.length()) ? 
        [a.at(i), a.at(i+1)] : [a.at(i)]);
    });    
  }
}

function each_cons(increment, f){
  if (typeof f == 'undefined') {
    var a = this.array.range(0,-2).map().with_index(function(x,i){ 
      return a.range(i, i + increment - 1);
    });
    var desc = this.inspect() + ':each_cons(' + increment + ')';
    this.temp_array = a;
    this.last_method = 'each';
    var enumerator = new rbSys.Enumerator(this, desc);
  }
  else {
    this.array.range(0,-2).each().with_index(function(x,i){ 
      f(a.range(i, i + increment - 1));
    });    
  }
}

function enumerable_first(){
  this.each();
  return this.temp_array[0];
}

// e.g. a2.inject({},function(r,x){ return r.merge(Hash(x.first(),x.last())); });
function enumerable_inject(arg, f){
  var rtype = {String: arg, Object: new rbHash(), Array: '', Number: arg};
  var result = rtype[functionName(arg).to_s()];
  this.each(function(x){ result = f(result, x);  });
  return result;
}

function enumerable_map(f){
  if (typeof f == 'function') {
    this.each( function(x){ return f(x); } );
    return this.temp_array;
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
  var a2 = this.map().with_index(function(x,i) {return [f(x),i];}).to_a();
  var a3 = a2.sort(sortNestedNumber);
  var a = this.to_a();
  
  if (this.is_a('Hash')) {
    return o(a3).inject({},function(r,x){ 
      var y = a[x.last()];  return r.merge( Hash(y.first(), y.last()) ); 
    });
  }
  else {  return o(a3).map(function(x){  return a[x.last()];  });  }
}

function enumerable_to_a(){  
  return this.custom_each(function(x){return x});
}

function rbEnumerable(s){
  this.count = enumerable_count;
  this.each = enumerable_each;
  this.each_slice = enumerable_each_slice;
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