const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentNumber = '';
let previousNumber = '';
let operation = null;

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent;

        if (buttonText >= '0' && buttonText <= '9' || (buttonText === '.' && !currentNumber.includes('.'))) {
            currentNumber += buttonText;
            display.value = currentNumber;
        } else if (buttonText === 'C') {
            currentNumber = '';
            previousNumber = '';
            operation = null;
            display.value = '';
        } else if (buttonText === '⌫') {
            currentNumber = currentNumber.slice(0, -1);
            display.value = currentNumber || '0';  // Display 0 when empty
        } else if (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/') {
            if (currentNumber === '') return;  // Prevent operation without a number
            previousNumber = currentNumber;
            currentNumber = '';
            operation = buttonText;
        } else if (buttonText === '=') {
            calculateResult();
        }
    });
});

function calculateResult() {
    if (!previousNumber || !currentNumber) return;  // Prevent calculation if input is missing
    let result;
    const num1 = parseFloat(previousNumber);
    const num2 = parseFloat(currentNumber);

    switch (operation) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num2 === 0 ? 'Error' : num1 / num2;  // Handle division by zero
            break;
        default:
            result = 0;
    }

    display.value = result.toString();
    currentNumber = result.toString();
    previousNumber = '';
    operation = null;
}
