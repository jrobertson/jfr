// file: enumerable.js

function enumerable_count(){  
  if (this.respond_to('size')) return this.size();
  else {
    this.each()
    return this.temp_array.length;
  }
}

function enumerable_each(f){
  
  if (typeof f == 'undefined') {  

    var desc = this.inspect() + ':each';
    this.temp_array = this.to_a();
    this.last_method = 'each';
    var enumerator = new rbSys.Enumerator(this, desc);

    return enumerator;      
  }  
  else {
    this.temp_array = this.custom_each(f); 
    return this;
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

function enumerable_map(f){
  if (typeof f == 'function') {
    this.each( function(x){ return f(x); } );
    return this.temp_array;
  }  
  else {
    var desc = this.inspect() + ':map';
    this.temp_array = this.to_a();
    this.last_method = 'map';
    var enumerator = new rbSys.Enumerator(this, desc);
    return enumerator;      
  }  
}

function enumerable_max(){ return o(this.sort()).last();}
function enumerable_min(){ return o(this.sort()).first();}

function enumerable_minmax(){
  var a = this.sort()
  return o([o(a).first(), o(a).last()]);
}

function enumerable_sort(){ 
  this.each();
  return this.temp_array.sort(sortNumber);
}

function enumerable_to_a(){  
  return this.custom_each(function(x){return x});
}

function rbEnumerable(s){
 
  this.count = enumerable_count;
  this.each = enumerable_each;
  this.first = enumerable_first;
  this.map = enumerable_map;
  this.max = enumerable_max;
  this.min = enumerable_min;  
  this.minmax = enumerable_minmax;
  this.sort = enumerable_sort;
  this.to_a = enumerable_to_a;


  //for(x in raw_object) {this.enumerable[x] = raw_object[x]};
}