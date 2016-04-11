const Denon = require('./denon');
const denon = new Denon("");

//console.log(denon.surroundOptions);

const Options = denon.surroundOptions;
const Class = "SurroundOptions";
const Description = "The surround options";

console.log("/**\n" +
` * ${Description}\n` +
" * \n" +
` * @class ${Class}\n` +
" */");

console.log("\r\n")

const keys = [];

for(var key in Options) {
  keys.push(key);
}

keys.forEach((key) => {
  const value = Options[key];

  const attribute = "/**\n" +
   `* The ${key} attribute.\n` +
   "*\n" +
   `* @default ${value}\n` +
   `* @property {string} ${key}\n` +
   "*/\n"

   console.log(attribute);
   console.log("\r\n")
});
