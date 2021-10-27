import { Synth } from "./audiosynth.js";

var piano = Synth.createInstrument('piano');

// piano.play('C#', 6, 2);



// import { compile } from "./compile.js";
// import { parse, tokenize } from "./parser.js";
// import { museTag } from "./createMuse-tag.js";

// const interpolated = museTag`;${() => ["a1", 2]} ^ 1`
// console.log("interpolated", interpolated);

// const toks = tokenize("[a4 e4]<");
// console.log("tokens:\n", toks)
// const [ ast, remainder ] = parse(toks);
// console.log("ast:\n", ast);
// console.log("remainder:\n", remainder);

// const result = compile(ast);
// console.log(result);