const toggle = document.getElementsByClassName("toggle-btn");
const arr = [...toggle];

arr.forEach((element, index) => {
  element.addEventListener("click", () => {
    element.style.opacity = "1";
    let targetTheme;
    if (index === 0) {
      targetTheme = "dark";
    } else if (index === 1) {
      targetTheme = "light";
    } else if (index === 2) {
      targetTheme = "purple";
    }
    document.documentElement.setAttribute("data-theme", targetTheme);
  
    arr
      .filter((item) => {
        return item != element;
      })
      .forEach((item) => {
        item.style.opacity = "0";
      });
  });
});

const numbers = document.querySelectorAll(".number");
const display = document.getElementById("display");
const operator = document.querySelectorAll(".operator");
const equal = document.getElementById("equal-btn");
const reset = document.getElementById("reset-btn");
const del = document.getElementById("del-btn");
const decimal = document.getElementById("dot");

let newNumber = true;
let operation;
let firstNumber;

const thereIsAnOperation = () => operation !== undefined;

const calc = () => {
  if(thereIsAnOperation()) {
    const currentNumber = parseFloat(display.innerText);
    newNumber = true;
    if (operation === "+") {
      updateDisplay(firstNumber + currentNumber);
    } else if (operation === "-") {
      updateDisplay(firstNumber - currentNumber);
    } else if (operation === "x") {
      updateDisplay(firstNumber * currentNumber);
    } else if (operation === "/") {
      updateDisplay(firstNumber / currentNumber);
    }
  }
};

const updateDisplay = (txt) => {
  if (newNumber) {
    display.innerText = txt;
    newNumber = false;
  } else {
    display.innerText += txt;
  }  
};

const insertNumber = (e) => updateDisplay(e.target.innerText); 

numbers.forEach (number => number.addEventListener("click", insertNumber));

const selectOperator = (e) => {
  if (!newNumber) {
    calc();
    newNumber = true;
    operation = e.target.innerText;
    firstNumber = parseFloat(display.innerText);
  }
};
operator.forEach (operation => operation.addEventListener("click", selectOperator));

const activateEqual = () => {
  calc();
  operation = undefined;
};

equal.addEventListener("click", activateEqual);

const deleteLast = () => display.innerText = display.innerText.slice(0, -1);

del.addEventListener("click", deleteLast);

const eraseAll = () => {
  display.innerText = "";
  operation = undefined;
  newNumber = true;
  firstNumber = undefined;
};

reset.addEventListener("click", eraseAll);

const thereIsDecimal = () => display.innerText.indexOf(".") !== -1;
const thereIsValue = () => display.innerText.length > 0;

const insertDecimal = () => {
  if (!thereIsDecimal()) {
      if (thereIsValue()) {
        updateDisplay(".");
      } else {
        updateDisplay("0.");
      }
    }
  };

decimal.addEventListener("click", insertDecimal);




    
