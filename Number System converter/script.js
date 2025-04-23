function convert() {
    const inputType = document.getElementById('inputType').value;
    const outputType = document.getElementById('outputType').value;
    const inputValue = document.getElementById('inputValue').value.trim();
    const stepsContainer = document.getElementById('calculationSteps');
    

    stepsContainer.innerHTML = '';
    

    if (!inputValue) {
        stepsContainer.innerHTML = 'Please enter a value to convert';
        document.getElementById('outputValue').value = '';
        return;
    }
    
    let decimalValue;
    let steps = '';
    

    switch (inputType) {
        case 'binary':
            if (!/^[01]+$/.test(inputValue)) {
                stepsContainer.innerHTML = 'Invalid binary number (only 0 and 1 allowed)';
                document.getElementById('outputValue').value = 'Error';
                return;
            }
            steps += `Converting binary ${inputValue} to decimal:\n`;
            steps += 'Method: Sum of (digit × 2^position)\n';
            decimalValue = parseInt(inputValue, 2);
 
            [...inputValue].reverse().forEach((digit, index) => {
                steps += `${digit} × 2^${index} = ${parseInt(digit) * Math.pow(2, index)}\n`;
            });
            steps += `Sum = ${decimalValue}\n\n`;
            break;
            
        case 'decimal':
            if (!/^-?\d+$/.test(inputValue)) {
                stepsContainer.innerHTML = 'Invalid decimal number (only digits 0-9 allowed)';
                document.getElementById('outputValue').value = 'Error';
                return;
            }
            decimalValue = parseInt(inputValue, 10);
            steps += `Using decimal value: ${decimalValue}\n\n`;
            break;
            
        case 'hexadecimal':
            if (!/^[0-9A-Fa-f]+$/.test(inputValue)) {
                stepsContainer.innerHTML = 'Invalid hexadecimal number (0-9, A-F allowed)';
                document.getElementById('outputValue').value = 'Error';
                return;
            }
            steps += `Converting hexadecimal ${inputValue.toUpperCase()} to decimal:\n`;
            steps += 'Method: Sum of (digit × 16^position)\n';
            decimalValue = parseInt(inputValue, 16);

            [...inputValue.toUpperCase()].reverse().forEach((digit, index) => {
                const digitValue = parseInt(digit, 16);
                steps += `${digit} × 16^${index} = ${digitValue * Math.pow(16, index)}\n`;
            });
            steps += `Sum = ${decimalValue}\n\n`;
            break;
            
        case 'octal':
            if (!/^[0-7]+$/.test(inputValue)) {
                stepsContainer.innerHTML = 'Invalid octal number (digits 0-7 allowed)';
                document.getElementById('outputValue').value = 'Error';
                return;
            }
            steps += `Converting octal ${inputValue} to decimal:\n`;
            steps += 'Method: Sum of (digit × 8^position)\n';
            decimalValue = parseInt(inputValue, 8);

            [...inputValue].reverse().forEach((digit, index) => {
                steps += `${digit} × 8^${index} = ${parseInt(digit) * Math.pow(8, index)}\n`;
            });
            steps += `Sum = ${decimalValue}\n\n`;
            break;
            
        default:
            stepsContainer.innerHTML = 'Invalid input type';
            document.getElementById('outputValue').value = 'Error';
            return;
    }
    

    let result;
    switch (outputType) {
        case 'binary':
            steps += `Converting decimal ${decimalValue} to binary:\n`;
            steps += 'Method: Divide by 2 and record remainders\n';
            result = decimalValue.toString(2);

            let num = decimalValue;
            while (num > 0) {
                const quotient = Math.floor(num / 2);
                const remainder = num % 2;
                steps += `${num} ÷ 2 = ${quotient} (remainder ${remainder})\n`;
                num = quotient;
            }
            steps += `Read remainders in reverse: ${result}\n`;
            break;
            
        case 'decimal':
            result = decimalValue.toString(10);
            steps += `Result in decimal: ${result}`;
            break;
            
        case 'hexadecimal':
            steps += `Converting decimal ${decimalValue} to hexadecimal:\n`;
            steps += 'Method: Divide by 16 and record remainders\n';
            result = decimalValue.toString(16).toUpperCase();

            num = decimalValue;
            while (num > 0) {
                const quotient = Math.floor(num / 16);
                const remainder = num % 16;
                steps += `${num} ÷ 16 = ${quotient} (remainder ${remainder})\n`;
                num = quotient;
            }
            steps += `Read remainders in reverse: ${result}\n`;
            break;
            
        case 'octal':
            steps += `Converting decimal ${decimalValue} to octal:\n`;
            steps += 'Method: Divide by 8 and record remainders\n';
            result = decimalValue.toString(8);
       
            num = decimalValue;
            while (num > 0) {
                const quotient = Math.floor(num / 8);
                const remainder = num % 8;
                steps += `${num} ÷ 8 = ${quotient} (remainder ${remainder})\n`;
                num = quotient;
            }
            steps += `Read remainders in reverse: ${result}\n`;
            break;
            
        default:
            stepsContainer.innerHTML = 'Invalid output type';
            document.getElementById('outputValue').value = 'Error';
            return;
    }
    

    document.getElementById('outputValue').value = result;
    stepsContainer.innerHTML = steps;
}