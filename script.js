let currentNumber = '';
let currentOperator;
let operators = '';
let sumParts = {
    a: '',
    b: '',
    operator: ''
};

buttons = document.querySelector('.buttons-grid')
screenBottom = document.querySelector('.screen-bottom')
screenTop = document.querySelector('.screen-top')

buttons.addEventListener('click', (e) => {   
    if (e.target.nodeName != 'BUTTON') {return}

    let buttonText = e.target.textContent;

    if (!isNaN(buttonText) && !isNaN(parseFloat(buttonText)) ){
        addNumber(buttonText)
        updateScreenBottom();
    }
    else if (['/', 'x', '-', '+'].includes(buttonText)){
        addOperator(buttonText)
    }
    else if (['CLEAR', 'DELETE'].includes(buttonText)){
        console.log("Is option! " + buttonText)
    }
    else if (buttonText == '='){
        sumParts.b = +currentNumber;
        currentNumber = getAnswer()
        console.log(currentNumber)
        updateScreenTop();
        updateScreenBottom();
        sumParts.b = ''   
    }
})

function updateScreenBottom(){
    screenBottom.textContent = currentNumber;
}

function updateScreenTop(){
    if (sumParts.b == ''){
        screenTop.textContent = `${sumParts.operator} ${sumParts.a}`;
    }
    else {
        screenTop.textContent = `= ${sumParts.b} ${sumParts.operator} ${sumParts.a}`;
    }
}

function getAnswer() {
    let ans = operate(sumParts.a, sumParts.operator, sumParts.b);
    console.log(sumParts.a + sumParts.operator + sumParts.b+'='+ans)
    return ans
}

function addNumber(number){
    currentNumber += number;
}

function addOperator(operator) {
    console.log("b = " + sumParts.b)
    if (sumParts.a != ''){
        sumParts.b = +currentNumber;
        currentNumber = getAnswer()
        updateScreenBottom();
    }
    else{ 
        sumParts.a = +currentNumber;
        sumParts.operator = operator
        currentNumber = ''
    }
    updateScreenTop();
}



function add(a, b){ return a + b;};
function subtract (a, b){ return a - b;};
function multiply (a, b){ return a * b;};
function divide (a, b){ return a / b;};

function operate(a, operator, b){
    switch(operator){
        case '+':
           return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
};

// if (sumParts.length == 3){
//     currentNumber= getAnswer();
//     sumParts.a = currentNumber
//     sumParts.operator = operator
//     updateScreenBottom();
//     currentNumber = ''
// }
// else{
//     sumParts.operator = operator
//     currentNumber = ''
// }
// updateScreenTop();



// screenTop.textContent = `= ${currentNumber} ${screenTop.textContent}`
// sumParts.a = +currentNumber
// currentNumber = getAnswer();
// updateScreenBottom();
// sumParts.a = currentNumber