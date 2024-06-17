document.addEventListener('DOMContentLoaded', function () {
    const calculator = document.querySelector('.calculator');
    const keys = calculator.querySelector('.calculator-keys');
    const display = calculator.querySelector('.calculator-screen');

    let firstValue = '';
    let operator = '';
    let waitingForSecondValue = false;

    keys.addEventListener('click', event => {
        const key = event.target;
        const keyValue = key.value;

        if (key.matches('button')) {
            if (key.classList.contains('operator')) {
                handleOperator(keyValue);
            } else if (key.classList.contains('equal-sign')) {
                handleEqualSign();
            } else if (key.classList.contains('all-clear')) {
                handleAllClear();
            } else {
                handleNumber(keyValue);
            }
        }
    });

    function handleNumber(keyValue) {
        if (waitingForSecondValue) {
            display.value = keyValue;
            waitingForSecondValue = false;
        } else {
            display.value = display.value === '0' ? keyValue : display.value + keyValue;
        }
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(display.value);

        if (operator && waitingForSecondValue) {
            operator = nextOperator;
            return;
        }

        if (firstValue === '') {
            firstValue = inputValue;
        } else if (operator) {
            const result = calculate(firstValue, operator, inputValue);
            display.value = result;
            firstValue = result;
        }

        waitingForSecondValue = true;
        operator = nextOperator;
    }

    function handleEqualSign() {
        const inputValue = parseFloat(display.value);
        if (firstValue === '' || operator === '') return;

        const result = calculate(firstValue, operator, inputValue);
        display.value = result;
        firstValue = '';
        operator = '';
        waitingForSecondValue = false;
    }

    function handleAllClear() {
        display.value = '';
        firstValue = '';
        operator = '';
        waitingForSecondValue = false;
    }

    function calculate(first, operator, second) {
        if (operator === '+') return first + second;
        if (operator === '-') return first - second;
        if (operator === '*') return first * second;
        if (operator === '/') return first / second;
        return second;
    }
});
