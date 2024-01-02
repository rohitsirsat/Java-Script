// Immediately Invoked Function Expressions (IIFE)

(function chai(fullName) {
  // named IIFE Immediately Invoked Function Expressions
  console.log(`DB CONNECTED ${fullName}`);
})("rohit sirsat");
// is upar wale ftn ko () in braces ke ander wrap kiya. isiliye uske baad () in braces ko use krke chai ftn ko call kiya ();

((name) => {
  console.log(`DB CONNECTED TWO ${name}`);
})("rohit");
