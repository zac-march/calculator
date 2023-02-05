let sum = {
    a: null,
    b: null,
    operator: '',
    isValid: function() {
        return (this.a != null && this.b != null && this.operator != null)
    }
};

let shouldClearScreen = false;

buttons = document.querySelector('.buttons-grid')
screenBottom = document.querySelector('.screen-bottom')
screenTop = document.querySelector('.screen-top')

buttons.addEventListener('click', (e) => {   
    if (e.target.nodeName != 'BUTTON') {return}

    let buttonText = e.target.textContent;

    if (!isNaN(buttonText) && !isNaN(parseFloat(buttonText)) ){
        appendNumber(buttonText)
    }
    else if (buttonText == '.'){
        handlePoint();
    }
    else if (['/', 'x', '-', '+'].includes(buttonText)){
        handleOperator(buttonText);
        return
    }
    else if (buttonText == 'DELETE'){
        handleDelete();
    }
    else if (buttonText == 'CLEAR'){
        handleClear();
    }
    else if (buttonText == '='){
        handleEquals(sum);
    }
})

function handlePoint(){
    screenBottomText = String(screenBottom.textContent)

    if (screenBottomText.includes('.')){return}
    if (screenBottomText = '') {screenBottom.textContent = '0'}
    appendNumber('.')

}

function handleEquals() {
    if (shouldClearScreen) {return}

    setCurrentOperand();

    if (sum.isValid()) {
        screenBottom.textContent = getAnswer();
        if (screenBottom.textContent == 'Math error!'){return}
        screenTop.textContent = `${sum.a} ${sum.operator} ${sum.b} = `;
        resetSum();
    }

}

function handleOperator(operator) {
    if (!shouldClearScreen) {
        setCurrentOperand();
        if (sum.isValid()) {
            let answer = getAnswer();
            if (answer == 'Math error!'){return}
            sum.a = answer
            sum.b = null
            screenBottom.textContent = sum.a
            screenTop.textContent = `${sum.a} ${sum.operator}`;
        }
    }

    addOperator(operator);
 
    if (sum.a != null){
        screenTop.textContent = `${sum.a} ${sum.operator}`;
    }


}

function setCurrentOperand() {
    if (+screenBottom.textContent != NaN) {
        if (sum.a === null) {
            sum.a = +screenBottom.textContent;
        }
        else {
            sum.b = +screenBottom.textContent;
        }
    }
    shouldClearScreen = true;
}

function handleDelete(){
    let currentOperand = String(screenBottom.textContent)
    if (currentOperand.length > 0) {
        screenBottom.textContent = currentOperand.slice(0, currentOperand.length - 1)
    }
}

function handleClear(){
    resetSum();
    screenBottom.textContent = ''
    screenTop.textContent = ''
}

function resetSum() {
    sum.a = null;
    sum.b = null;
    sum.operator = '';
    shouldClearScreen = true;
}

function getAnswer() {
    if (sum.operator === '/' && (sum.b == 0 || sum.a == 0)){
        shouldClearScreen = true;
        handleClear();
        screenBottom.textContent = 'Math error!'
        return 'Math error!'
    }
    return operate();
}

function appendNumber(number){
    if (shouldClearScreen){
        screenBottom.textContent = ''
        shouldClearScreen = false;
    }

    screenBottom.textContent += number
}

function addOperator(operator) {
    sum.operator = operator;
}

function operate(){
    const {a, operator, b} = sum;
    switch(operator){
        case '+':
           return a + b;
        case '-':
            return a - b;
        case 'x':
            return a * b;
        case '/':
            return a / b;
    }
};