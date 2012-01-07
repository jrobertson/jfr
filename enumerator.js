// file: enumerator.js


function enumerator_count(){  return this.obj.array.length; }
function enumerator_each(f){  return this.obj.custom_each(f); }
function enumerator_inspect(){  return '#<Enumerator: ' + this.desc + '>';}

function enumerator_with_index(f){
  if (typeof f == 'undefined') {    
    var desc = this.inspect() + ':with_index';
    var i = 0;
    var new_a = this.map(function(x){ var r =  o([x, i]); i += 1; return r});
    new_a.temp_array = new_a.to_a();
    new_a.last_method = 'with_index';
    var enumerator = new rbEnumerator(new_a, desc);
    return enumerator;      
  }  
  else {
    var a = [];
    for (var i = 0; i < this.obj.temp_array.length; i++) {
      a.push(f(this.obj.temp_array[i], i));
    }
    
    this.obj.temp_array = o(a);
    var r  = (this.obj.last_method == 'each') ? this.obj.array : this.obj.temp_array;
    
    this.obj.last_method = '';
    return r;
  }  
}

function rbEnumerator(obj, desc){
  this.desc = desc;
  this.obj = obj;
  this.count = enumerator_count;
  this.custom_each = enumerator_each;
  this.inspect = enumerator_inspect;
  this.last_method = '';
  this.temp_array = nil;
  this.with_index = enumerator_with_index;  
  
  if (typeof desc != 'undefined') {
    this.temp_array = obj.temp_array;
  }
  else { } // function block
}