class Stack {
  constructor() {
    this.arr = [];
    this.index = 0;
  }
  push(item) {
    this.arr[this.index++] = item;
  }
  pop() {
    if (this.index <= 0) return null;
    const result = this.arr[--this.index];
    return result;
  }
  isEmpty() {
    return this.index === 0 ? true : false;
  }
  peek() {
    return this.arr[this.index];
  }
}

let ConToRPNExp = (exp) => {
  let stack = new Stack();
  let conExp = [];

  for (let i = 0; i < exp.length; i++) {
    if (Number.isNaN(Number(exp[i])) === false) {
      if (exp[i] === " ") continue;
      conExp.push(exp[i]);
    } else {
      switch (exp[i]) {
        case "(":
          stack.push("(");
          break;
        case ")":
          while (!stack.isEmpty()) {
            let popOp = stack.pop();
            if (popOp === "(") break;
            conExp.push(popOp);
          }
          break;
        case "+":
        case "-":
        case "*":
        case "/":
          while (!stack.isEmpty() && WhoPreOp(stack.peek(), exp[i]) >= 0)
            conExp.push(stack(pop));
          stack.push(exp[i]);
          break;
      }
    }
  }
  while (!stack.isEmpty()) conExp.push(stack.pop());
  return conExp;
  // exp = conExp;
};

let GetOpPrec = (op) => {
  switch (op) {
    case "*":
    case "/":
      return 5;
    case "+":
    case "-":
      return 3;
    case "(":
      return 1;
  }
  return -1;
};

let WhoPreOp = (op1, op2) => {
  let op1prec = GetOpPrec(op1);
  let op2prec = GetOpPrec(op2);

  if (op1prec > op2prec) return 1;
  else if (op1prec < op2prec) return -1;
  else return 0;
};

let EvalRPNExp = (exp) => {
  let stack = new Stack();
  let op1;
  let op2;

  for (let i = 0; i < exp.length; i++) {
    if (Number.isNaN(Number(exp[i])) === false) stack.push(+exp[i]);
    else {
      op2 = stack.pop();
      op1 = stack.pop();

      switch (exp[i]) {
        case "+":
          stack.push(op1 + op2);
          break;
        case "-":
          stack.push(op1 - op2);
          break;
        case "*":
          stack.push(op1 * op2);
          break;
        case "/":
          stack.push(op1 / op2);
          break;
      }
    }
  }
  return stack.pop();
};

let main = (function () {
  console.log(EvalRPNExp(ConToRPNExp(")(1+2)*3")));
})();
