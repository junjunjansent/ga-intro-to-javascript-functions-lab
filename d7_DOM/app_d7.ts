// Practing typescript but i need to compile
// tsc app_d7.ts --watch

// Here are the user stories for this lab:
// As a user, I want to be able to select numbers so that I can perform operations with them.
// As a user, I want to be able to add two numbers together.
// As a user, I want to be able to subtract one number from another.
// As a user, I want to be able to multiply two numbers together.
// As a user, I want to be able to divide one number by another.
// As a user, I want to be able to see the output of the mathematical operation.
// As a user, I want to be able to clear all operations and start from 0.

// Minimum Viable Product (MVP) for this lab focuses on basic functionality and does not cover edge cases,
// such as pressing an operator button multiple times. You are encouraged to tackle these advanced cases
// once you have achieved the MVP.

/*-------------------------------- Calculator Rules --------------------------------*/
// i will split numbers and operators with spaces " "
// only operations allowed are + - * / and ** for exponential
// i will avoid caring about BODMAS first
// i will store everything in display as a string
// only when equals is pressed, handleEquals function will take everything in display and calculate without bodmas

// assume textContent of buttons CANNOT BE null

// CHALLENGE - a lot of string manipulation

/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/
let display = "";

/*------------------------ Cached Element References ------------------------*/
// i dont really like how it is out here globally
const calculatorContainer = document.getElementById("calculator");
const displayDiv = document.querySelector(".display");

// LESSON: i didnt really use this because i used calculator Container as a common event listener
// const numberButtons = document.querySelectorAll(".button.number");
// const operatorButtons = document.querySelectorAll(".button.operator");
// const equalsButton = document.querySelectorAll(".button.equals");

/*-------------------------------- Functions --------------------------------*/
// You can place function declarations anywhere, but often, devs put them at the bottom. BUT need to put if i use arrow function

const calculatorFunctions = (event: MouseEvent) => {
  //   calculator

  const target = event.target;

  // TYPESCRIPT: Exit early if it's not an HTMLElement
  if (!(target instanceof HTMLElement)) {
    return;
  }

  // TYPESCRIPT: Using Nullish coalescing operator for null | undefined
  let display: string = displayDiv?.textContent ?? "";
  let input: string = "";

  // to prevent exact match of classes, i use classList contains
  // all functions modifies display in order to handle zero
  if (target.classList.contains("number")) {
    input = handleNumber(target, display);
  } else if (target.classList.contains("operator")) {
    input = handleOperator(target, display);
  } else if (target.classList.contains("equals")) {
    input = handleEqual(target, display);
    displayDiv!.innerHTML = "<strong>" + input + "</strong>";
    return;
  } else {
    // to allow me to ignore wrong presses
    return;
  }

  // TYPESCRIPT: I am promising that displayDiv msut be a HTML element (i can only use ? for reading values). a bit contradictory cause i put displayDiv! above lol, but its for my notes
  displayDiv!.textContent = input;
};

const handleNumber = (target: HTMLElement, display: string): string => {
  // handling zeros
  // if display shows only one number that is any number of zero OR empty ---> display = zero
  // if display shows any argument, check that if a space exists, e.g. " 000002" removes leading zeroes

  let lastSpaceIndex = display.lastIndexOf(" ");
  let lastNumber = display.slice(lastSpaceIndex + 1, display.length);

  if (target.textContent === "0" && lastNumber === "0") {
    // lastNumber will just remaing as zero
    alert("Already a zero there.");
    return display;
  } else if (lastNumber === "0") {
    return display.slice(0, -1) + target.textContent;
  } else {
    return display + target.textContent;
  }
};

const handleOperator = (target: HTMLElement, display: string): string => {
  let lastSpaceIndex = display.lastIndexOf(" ");
  let lastOperator = display.slice(lastSpaceIndex - 2, lastSpaceIndex) ?? "";
  let lastNumber = display.slice(lastSpaceIndex + 1, display.length);
  let input = "";

  //   console.dir(target.textContent);
  //   console.log(lastNumber);
  //   console.log(lastOperator);

  // handles unique cases for quick return
  // (1) C is pressed,
  // (2) is lastNumber actually exists
  // (3) if display is empty
  // (4) if lastOperator already has two math elements (except "**")
  if (target.textContent === "C") {
    return "";
  } else if (lastNumber !== "") {
    input = ` ${target.textContent} `;
    return display + input;
  } else if (display === "") {
    return `0 ${target.textContent} `;
  } else if (lastOperator[0] !== " " && lastOperator !== "**") {
    alert("Think we have enough operations here.");
    return display;
  }

  // max two operation --> to be accepted
  // * --> + OR - OR *
  // / --> + OR -
  // + --> + OR -
  // - --> + OR -
  // ** --> + OR -

  // leftover cases
  // display is NOT empty AND lastNumber does NOT exist
  // i.e. it will now look at secondary operators
  if (target.textContent === "+" || target.textContent === "-") {
    return display.slice(0, -1) + `(${target.textContent}) `;
  } else if (target.textContent === "*" && lastOperator == " *") {
    return display.slice(0, -1) + "* ";
  } else {
    alert("Can't put these two operations together");
  }

  // LESSON - BAD CODE
  //   switch (lastOperator) {
  //     case " +":
  //       if (target.textContent === "+") {
  //         return display.slice(0, -1) + "(+) ";
  //       } else if (target.textContent === "-") {
  //         return display.slice(0, -1) + "(-) ";
  //       } else {
  //         alert("Can't put these two operations together");
  //       }
  //       break;
  //     case " -":
  //       if (target.textContent === "+") {
  //         return display.slice(0, -1) + "(+) ";
  //       } else if (target.textContent === "-") {
  //         return display.slice(0, -1) + "(-) ";
  //       } else {
  //         alert("Can't put these two operations together");
  //       }
  //       break;
  //     case " *":
  //       if (target.textContent === "+") {
  //         return display.slice(0, -1) + "(+) ";
  //       } else if (target.textContent === "-") {
  //         return display.slice(0, -1) + "(-) ";
  //       } else if (target.textContent === "*") {
  //         return display.slice(0, -1) + "* ";
  //       } else {
  //         alert("Can't put these two operations together");
  //       }
  //       break;
  //     case " /":
  //       if (target.textContent === "+") {
  //         return display.slice(0, -1) + "(+) ";
  //       } else if (target.textContent === "-") {
  //         return display.slice(0, -1) + "(-) ";
  //       } else {
  //         alert("Can't put these two operations together");
  //       }
  //       break;
  //     default:
  //       break;
  //   }

  return display + input;
};

const handleEqual = (target: HTMLElement, display: string): string => {
  const arrayToCalculate = display.split(" ");
  console.log(arrayToCalculate);

  let answer: number = Number(arrayToCalculate[0]) ?? 0;

  // do operation when item is a number
  for (let i = 1; i < arrayToCalculate.length; i++) {
    let item = arrayToCalculate[i];
    let itemBefore = arrayToCalculate[i - 1] ?? 0;
    let i_Parenthesis_itemBefore = itemBefore.indexOf("(");

    // 2 conditions
    // if item is not a number, skip this iteration as next one shld be a number
    // if item is a number, prepare if (+) or (-) exists in itemBefore

    if (isNaN(Number(item))) {
      //   console.log("is a NaN");
      continue;
    } else if (i_Parenthesis_itemBefore !== -1) {
      switch (itemBefore.charAt(i_Parenthesis_itemBefore + 1)) {
        case "+":
          // no change in item value
          itemBefore = itemBefore.slice(0, i_Parenthesis_itemBefore);
          break;
        case "-":
          item = "-" + item;
          itemBefore = itemBefore.slice(0, i_Parenthesis_itemBefore);
          break;
        default:
          break;
      }
      //   console.log("includes ( --> " + itemBefore + " " + item);
    }

    // if itemBefore is an operation, do the operation to answer
    switch (itemBefore) {
      case "+":
        answer += Number(item ?? 0);
        break;
      case "-":
        answer -= Number(item ?? 0);
        break;
      case "*":
        answer *= Number(item ?? 0);
        break;
      case "/":
        if (Number(item ?? 0) === 0) {
          return "Infinity";
        }
        answer /= Number(item ?? 1);
        break;
      case "**":
        answer **= Number(item ?? 1);
        break;
      default:
        break;
    }
  }

  return String(answer);
};

/*----------------------------- Event Listeners -----------------------------*/
// we shall split into 3 different listeners, number, operator, and equal
// console.dir(numberButtons);
calculatorContainer?.addEventListener("click", calculatorFunctions);
