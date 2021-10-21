import { compile } from "./compile.js";
import { parse, tokenize } from "./parser.js";

const toks = tokenize("a4 ^ 1 e4 _ 1");
console.log("tokens:\n", toks)
const [ ast, remainder ] = parse(toks);
console.log("ast:\n", ast);
console.log("remainder:\n", remainder);

const result = compile(ast);
console.log(result);