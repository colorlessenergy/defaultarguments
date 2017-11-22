// Write a function defaultArguments. It takes a function as an argument, along with an object containing default values for that function's arguments, and returns another function which defaults to the right values.

// You cannot assume that the function's arguments have any particular names.

// You should be able to call defaultArguments repeatedly to change the defaults.

// function add(a,b) { return a+b;};

// var add_ = defaultArguments(add,{b:9});
// add_(10); // returns 19
// add_(10,7); // returns 17
// add_(); // returns NaN

// add_ = defaultArguments(add_,{b:3, a:2});
// add_(10); // returns 13 now
// add_(); // returns 5

// add_ = defaultArguments(add_,{c:3}); // doesn't do anything, since c isn't an argument
// add_(10); // returns NaN
// add_(10,10); // returns 20
// HINT: This problem requires using Fuction.prototype.toString() in order to extract a function's argument list

function add(a,b) { return a + b }

function defaultArguments(func, params) {
    let funString = "";
    let letters = (func + '')
    .replace(/[/][/].*$/mg,'') // strip single-line comments
    .replace(/\s+/g, '') // strip white space
    .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments  
    .split('){', 1)[0].replace(/^[^(]*[(]/, '') // extract the parameters  
    .replace(/=[^,]+/g, '');


    let addLetters = /{([^}]*)}/.exec(func.toString());
    
    

    console.log(func.toString(), addLetters)
    for (var key in params) {
        funString += key + "=" + params[key] + ",";                
    }

    funString.split(",").forEach(function(e) {
        letters.split(",").forEach(function(w) {
            if (e[0] === w[0]) {
                letters = letters.replace(w, e)  
            }
        });
    });

    return func = new Function(letters, addLetters[1]);;
}

var add_ = defaultArguments(add,{b:9});

console.log(add_(10));
