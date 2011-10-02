// file: enumerable.js

function enumerable_count(){  
  return this.array.length;
}

function enumerable_each(f){
  if (typeof f == 'function') {  
    this.custom_each(f); return this;
  }  
  else {
    var desc = this.inspect() + ':each';
    this.array = this.to_a();
    var enumerator = new rbSys.Enumerator(this, desc);
    return enumerator;      
  }  
}

function enumerable_map(f){
  if (typeof f == 'function') {
    return this.each( function(x){ return f(x); } );
  }  
  else {
    var desc = this.inspect() + ':map';
    this.array = this.to_a();
    var enumerator = rb.Enumerator.new(this, desc);
    return enumerator;      
  }  
}

function enumerable_to_a(){  
  return this.custom_each();
}

function rbEnumerable(s){
 
  this.count = enumerable_count;
  this.each = enumerable_each;
  this.map = enumerable_map;
  this.to_a = enumerable_to_a;

  //for(x in raw_object) {this.enumerable[x] = raw_object[x]};
}