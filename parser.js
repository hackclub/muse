
const oneOf = item => w => w.startsWith(item);
const anyOf = arr => w => arr.some(oneOf(w));

const skip = ["ws"];
const literals = ["x", ";", "[", "]", "^", "_", "<"];

const tokenRules = {
  number: /\d+/,
  length: /\-+|\++/,
  ws: /\s+/,
  literal: anyOf(literals),
  symbol: /[a-zA-Z][a-zA-Z\d\#]*/,
  referenceFunc: /\$f[\d+]/,
  referenceArr: /\$a[\d+]/
}

const regExFunc = regex => string => { // not used
  const match = string.match(regex); 
  return match && match[0] === string;
}

const makeTest = (rule, start = false) => // not used
  rule instanceof RegExp ? regExFunc(rule)
  : typeof rule === "string" ? x => rule.startsWith(x)
  : Array.isArray(rule) ? x => rule.map(makeTest).some(f => f(x))
  : rule; // is function

const makeTokenizer = (rules, { skip = [], literals = [] } = { }) => string => { 
  let index = 0;
  const peek = () => string[index];
  // const next = () => string[index++];
  const tokens = [];

  while (index < string.length) {
    let type, value;

    for (const key in rules) {
      type = key;
      value = null;
      let rule = rules[key];
      if (rule instanceof RegExp) {
        let tempValue = string.slice(index).match(rule);

        if (tempValue !== null && tempValue.index === 0) {
          value = tempValue[0];        
          break;
        }
      } else if (typeof rule === "function") {
        if (rule(peek())) {
          let i = index;
          value = string[i]
          while (rule(value)) {
            if(rule(value + string[i + 1])) value += string[++i];
            else break;
          }
          break;
        }
      }
    }

    if (value === undefined || value === null) throw `Unknown character: ${peek()}`
    if (literals.includes(value)) type = value;
    if (!skip.includes(type)) tokens.push({ type, value, index });
    index += value.length;

  }

  return tokens;
}

//////////////////////////////

const convert = pred => s => {
  return s[0] && (s[0].type === pred)
    ? [ s[0], s.slice(1) ] 
    : null
}

// const any = s => s[0] ? [ s[0], s.slice(1) ] : null; // Do I want this?

const many = (pred, transform = null) => s => {
  if (typeof pred === "string") pred = convert(pred);

  const arr = [];
  let next = pred(s);

  while (next) {
    arr.push(next);
    next = pred(next[1]);
  }

  return arr.length > 0 
    ? [ ( transform ? transform(arr.map(([x]) => x)) : arr.map(([x]) => x) ), arr[arr.length - 1][1] ] 
    : [[], s];
}

const or = (preds, transform = null) => s => {
    const result = preds.reduce((acc, cur) => 
        acc || (typeof cur === "string" ? convert(cur) : cur)(s)
      , false);

    return Array.isArray(result) 
      ? (transform ? [ transform(result[0]), result[1] ] : result)
      : null;
}

const and = (preds, transform = null) => s => { // must match each predicate
  const result = [];
  for (let pred of preds) {
    if (typeof pred === "string") pred = convert(pred);

    const next = pred(s);
    if (next === null) return null;
    s = next[1];
    result.push(next[0])
  }
  
  return result.length === preds.length 
    ? [transform ? transform(result) : result, s] 
    : null;
}

const opt = pred => s => { // optional
  if (typeof pred === "string") pred = convert(pred);

  const next = pred(s);
  if (next === null) return [null, s]; // should I use null or []
  else return next;
}

const trim = pred => or([ // not used
  and(["ws", pred, "ws"], ([_0, x, _1]) => x),
  and([pred, "ws"], ([x, _]) => x),
  and(["ws", pred], ([_, x]) => x),
  pred
])

const none = () => s => [ null, s ]; // not used

const any = () => s => [ s[0], s.slice(1) ]; // not used

const optionalWs = s => or([ // not used
  "ws",
  none
])(s);

const joined = (preds, transform = null) => s => { // must match each predicate
  const result = [];

  let startIndex = null;
  for (let pred of preds) {
    if (typeof pred === "string") pred = convert(pred);

    const next = pred(s);
    if (next === null) return null;
    s = next[1];

    if (startIndex !== null) {
      if (next[0].index !== startIndex) return null;
    }
    startIndex = next[0].index + next[0].value.length;

    result.push(next[0])
  }
  
  return result.length === preds.length 
    ? [transform ? transform(result) : result, s] 
    : null;
}

///////////////////

class Stream { // not used
  constructor(ast) {
    this.index = 0;
    this.ast = ast;
  }

  peek() {
    return this.ast[this.index];
  }

  next() {
    const current = this.ast[this.index];
    this.index++;
    return current;
  }

  eof() {
    return this.peek() === undefined;
  }
}

//////////////////////////////

const tokenize = makeTokenizer(tokenRules, { skip, literals });

const convertModifier = x => {
  if (Array.isArray(x) && x[0].type === "^") return { type: "up-shift", number: Number(x[1].value) }
  else if (Array.isArray(x) && x[0].type === "_") return { type: "down-shift", number: Number(x[1].value) }
  else if (Array.isArray(x) && x[0].type === "x") return { type: "repeat", number: Number(x[1].value) }
  else return x;
}

const convertModifier0 = x => x[3] === null ? x[1] : ({ type: "modifier", notes: x[1], modifiers: x[3] })
const convertModifier1 = x => x[1] === null ? x[0] : ({ type: "modifier", notes: [x[0]], modifiers: x[1] })

const p = s => or([
  and([ "[", many(p), "]", opt(modifier)], convertModifier0),
  and([ note, opt(modifier) ], convertModifier1),
])(s);

const note = s => or([
  "symbol",
  ";",
  "referenceArr"
])(s);

const modifier = s => many(or([
  and(["x", "number"]),
  "length",
  "<",
  and(["^", "number"]),
  and(["_", "number"]),
  "referenceFunc"
], convertModifier))(s)

const parse = many(p);

export { parse, tokenize };








