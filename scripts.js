let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}

function handleSymbol(symbol) {
    switch (symbol) {
        case "C":
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;
        case "=":
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←': // Đã sửa ký tự mũi tên
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.slice(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−': // Sửa ký tự cho dấu trừ
        case '×': // Sửa ký tự cho dấu nhân
        case '÷': // Sửa ký tự cho dấu chia
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0' && runningTotal === 0) {
        return;
    }
    const intBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "−") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= intBuffer;
    } else if (previousOperator === "÷") {
        runningTotal /= intBuffer;
    }
}

function init() {
    document.querySelector('.wrapper').addEventListener('click', function (event) {
        if (event.target.classList.contains('cals-buttons')) {
            const buttonText = event.target.innerText.trim();
            let symbol;
            switch (buttonText) {
                case '←':
                    symbol = '←';
                    break;
                case '÷':
                    symbol = '÷';
                    break;
                case '×':
                    symbol = '×';
                    break;
                case '−': // Ký tự dấu trừ
                    symbol = '−';
                    break;
                case '+':
                    symbol = '+';
                    break;
                case '=':
                    symbol = '=';
                    break;
                case 'C':
                    symbol = 'C';
                    break;
                default:
                    symbol = buttonText;
                    break;
            }
            buttonClick(symbol);
        }
    });
}
init();