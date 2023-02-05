let currentNumber = '';
let sumParts = {
    a: '',
    b: '',
    operator: ''
};

buttons = document.querySelector('.buttons-grid')
screenBottom = document.querySelector('.screen-bottom')
screenTop = document.querySelector('.screen-top')
clearButton = document.querySelector('.clear-button')

buttons.addEventListener('click', (e) => {   
    if (e.target.nodeName != 'BUTTON') {return}

    let buttonText = e.target.textContent;

    if (!isNaN(buttonText) && !isNaN(parseFloat(buttonText)) ){
        handleNumber(buttonText)
    }
    else if (['/', 'x', '-', '+'].includes(buttonText)){
        handleOperator(buttonText);
        return
    }
    else if (['DELETE'].includes(buttonText)){
        handleDelete();
    }
    else if (buttonText == 'CLEAR'){
        handleClear();
    }
    else if (buttonText == '='){
        currentNumber = getAnswer()
        updateScreenTop();
        sumParts.b = ''   
    }
    updateScreenBottom();
})

function handleOperator(buttonText) {
    function updateAns(){
        currentNumber = getAnswer();
        sumParts.a = +currentNumber;
        sumParts.b = '';
    }

    if (sumParts.a != '' && currentNumber != '') {
        updateAns();
        addOperator(buttonText);
    } else if (sumParts.a != '') {
        addOperator(buttonText);
        updateAns();
    } else {
        addOperator(buttonText);
        sumParts.a = +currentNumber;
    }
    updateScreenBottom();
    updateScreenTop();
    currentNumber = ''
}

function handleDelete(){
    if (currentNumber.length > 0) {
        currentNumber = currentNumber.slice(0, currentNumber.length - 1)
    }
    updateScreenBottom();
}

function handleClear(){
    sumParts = {
        a: '',
        b: '',
        operator: ''
    };
    currentNumber = '';
    updateScreenBottom();
    updateScreenTop();
}

function updateScreenBottom(){
    screenBottom.textContent = currentNumber;
}

function updateScreenTop(){
    if (sumParts.b == ''){
        screenTop.textContent = `${sumParts.a} ${sumParts.operator}`;
    }
    else {
        screenTop.textContent = `${sumParts.a} ${sumParts.operator} ${sumParts.b} = `;
    }
}

function getAnswer() {
    sumParts.b = +currentNumber;
    let ans = operate(sumParts.a, sumParts.operator, sumParts.b);
    console.log(sumParts.a + sumParts.operator + sumParts.b+'='+ans)
    return ans
}

function handleNumber(number){
    currentNumber += number;
}

function addOperator(operator) {
    sumParts.operator = operator;
}

function add(a, b){ return a + b;};
function subtract (a, b){ return a - b;};
function multiply (a, b){ return a * b;};
function divide (a, b){ 
    let ans = a == 0 || b == 0 ? 'Math error' : a / b
    return ans
}

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