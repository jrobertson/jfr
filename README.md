There are numerous JavaScript libraries including Coffescript which provide Ruby functions yet I decided in the interest of learning more about Ruby and JavaScript that I use my own  code instead. I don't have great ambitions for this project, I just want to have more fun with JavaScript using a subset of Ruby sitting on top.

To get you in the mindset here's some examples:

    // displaying items in an array 
    rb.Array.new( ['red', 'green', 'orange'] ).each(function(x){  puts (x) });

    // making a string lower case
    rb.String.new('THIS is FRIDAY.').downcase(); //=> this is friday.

    // summing numbers in an array
    rb.Array.new([1,2,3,4]).inject(0,function(r,x){ return r + x; }) //=> 10

To try out the code I recommend copying and pasting the code into NodeJS. Copy the jfr.js code last into the console as this contains the rb object which calls the other Ruby custom objects. 
