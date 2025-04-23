document.addEventListener('DOMContentLoaded', function() {

    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const base1Select = document.getElementById('base1');
    const base2Select = document.getElementById('base2');
    const opButtons = document.querySelectorAll('.op-btn');
    const calculateBtn = document.getElementById('calculate');
    const clearBtn = document.getElementById('clear');
    
    const resultHex = document.getElementById('result-hex');
    const resultDec = document.getElementById('result-dec');
    const resultBin = document.getElementById('result-bin');
    const resultOct = document.getElementById('result-oct');
    
    const stepsContainer = document.getElementById('steps-container');
    
    let selectedOperation = 'add';
    

    opButtons.forEach(button => {
        button.addEventListener('click', function() {
 
            opButtons.forEach(btn => btn.classList.remove('active'));
            
     
            this.classList.add('active');
            

            selectedOperation = this.getAttribute('data-op');
        });
    });
    
    calculateBtn.addEventListener('click', calculate);
    clearBtn.addEventListener('click', clear);
    

    opButtons[0].classList.add('active');
    
    function calculate() {

        stepsContainer.innerHTML = '';
        

        const num1Str = num1Input.value.trim();
        const num2Str = num2Input.value.trim();
        const base1 = base1Select.value;
        const base2 = base2Select.value;

        if (!num1Str || !num2Str) {
            alert('Please enter both numbers');
            return;
        }
        
        try {

            addStep(`Converting ${num1Str} (${getBaseName(base1)}) to decimal:`);
            const num1 = convertToDecimal(num1Str, base1, true);
            addStep(`= ${num1}\n`);
            
            addStep(`Converting ${num2Str} (${getBaseName(base2)}) to decimal:`);
            const num2 = convertToDecimal(num2Str, base2, true);
            addStep(`= ${num2}\n`);
            

            let result;
            let opSymbol;
            
            switch (selectedOperation) {
                case 'add':
                    opSymbol = '+';
                    result = num1 + num2;
                    break;
                case 'sub':
                    opSymbol = '-';
                    result = num1 - num2;
                    break;
                case 'mul':
                    opSymbol = '×';
                    result = num1 * num2;
                    break;
                case 'div':
                    opSymbol = '÷';
                    if (num2 === 0) {
                        alert('Division by zero is not allowed');
                        return;
                    }
                    result = num1 / num2;
                    break;
                default:
                    result = 0;
            }
            
            addStep(`Performing operation (decimal):`);
            addStep(`${num1} ${opSymbol} ${num2} = ${result}\n`);
            

            displayResults(result);
            
        } catch (error) {
            alert('Invalid number for the selected base: ' + error.message);
        }
    }
    
    function convertToDecimal(numStr, base, showSteps = false) {
        switch (base) {
            case 'hex':
                if (!/^[0-9A-Fa-f]+$/.test(numStr)) {
                    throw new Error('Invalid hexadecimal number');
                }
                const hexVal = parseInt(numStr, 16);
                if (showSteps) {
                    addStep(`${numStr} (base 16) = `);
                    [...numStr.toUpperCase()].forEach((char, i) => {
                        const digitValue = parseInt(char, 16);
                        const power = numStr.length - 1 - i;
                        addStep(`${digitValue} × 16^${power}${i < numStr.length - 1 ? ' + ' : ''}`);
                    });
                }
                return hexVal;
            case 'dec':
                if (!/^-?\d+$/.test(numStr)) {
                    throw new Error('Invalid decimal number');
                }
                return parseInt(numStr, 10);
            case 'bin':
                if (!/^[01]+$/.test(numStr)) {
                    throw new Error('Invalid binary number');
                }
                const binVal = parseInt(numStr, 2);
                if (showSteps) {
                    addStep(`${numStr} (base 2) = `);
                    [...numStr].forEach((char, i) => {
                        const digitValue = parseInt(char, 2);
                        const power = numStr.length - 1 - i;
                        addStep(`${digitValue} × 2^${power}${i < numStr.length - 1 ? ' + ' : ''}`);
                    });
                }
                return binVal;
            case 'oct':
                if (!/^[0-7]+$/.test(numStr)) {
                    throw new Error('Invalid octal number');
                }
                const octVal = parseInt(numStr, 8);
                if (showSteps) {
                    addStep(`${numStr} (base 8) = `);
                    [...numStr].forEach((char, i) => {
                        const digitValue = parseInt(char, 8);
                        const power = numStr.length - 1 - i;
                        addStep(`${digitValue} × 8^${power}${i < numStr.length - 1 ? ' + ' : ''}`);
                    });
                }
                return octVal;
            default:
                return 0;
        }
    }
    
    function displayResults(decimalResult) {
     
        const isFloat = !Number.isInteger(decimalResult);
        

        if (isFloat) {
            resultHex.textContent = decimalResult.toString(16).toUpperCase();
        } else {
            resultHex.textContent = decimalResult.toString(16).toUpperCase();
        }
        

        resultDec.textContent = decimalResult.toString(10);
        

        if (isFloat) {
            resultBin.textContent = 'N/A (floating point)';
        } else {
            resultBin.textContent = decimalResult.toString(2);
        }
        

        if (isFloat) {
            resultOct.textContent = 'N/A (floating point)';
        } else {
            resultOct.textContent = decimalResult.toString(8);
        }
        

        if (!isFloat) {
            addStep('\nConverting result to other bases:');
            
            addStep(`Decimal: ${decimalResult} (base 10)`);
            
            addStep(`Hexadecimal: ${decimalResult.toString(16).toUpperCase()} (base 16)`);
            addStep(`Calculation: Divide by 16 until quotient is 0`);
            
            addStep(`Binary: ${decimalResult.toString(2)} (base 2)`);
            addStep(`Calculation: Divide by 2 until quotient is 0`);
            
            addStep(`Octal: ${decimalResult.toString(8)} (base 8)`);
            addStep(`Calculation: Divide by 8 until quotient is 0`);
        }
    }
    
    function clear() {
        num1Input.value = '';
        num2Input.value = '';
        base1Select.value = 'dec';
        base2Select.value = 'dec';
        

        opButtons.forEach(btn => btn.classList.remove('active'));
        opButtons[0].classList.add('active');
        selectedOperation = 'add';
        

        resultHex.textContent = '';
        resultDec.textContent = '';
        resultBin.textContent = '';
        resultOct.textContent = '';
        

        stepsContainer.innerHTML = '';
    }
    
    function addStep(text) {
        const stepElement = document.createElement('div');
        stepElement.className = 'step';
        stepElement.textContent = text;
        stepsContainer.appendChild(stepElement);
    }
    
    function getBaseName(base) {
        switch (base) {
            case 'hex': return 'hexadecimal';
            case 'dec': return 'decimal';
            case 'bin': return 'binary';
            case 'oct': return 'octal';
            default: return '';
        }
    }
});