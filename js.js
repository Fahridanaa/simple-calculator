const add = (num1, num2) => {
    return num1 + num2;
};

const substract = (num1, num2) => {
    return num1 - num2;
};

const multiply = (num1, num2) => {
    return num1 * num2;
};

const divide = (num1, num2) => {
    return num1/num2;
};


const hitung = (operator, ...num) => {
    if(operator == '+'){
        return add(...num);
    }if(operator == '-'){
        return substract(...num);
    }if(operator == 'x'){
        return multiply(...num);
    }if(operator == '/'){
        return divide(...num);
    }
}

let operator = '';
let num = [];
let done = false;
let isDec = false;
const score = document.querySelector('.score > .operate');
const history = document.querySelector('.score > .history');
const key = document.querySelectorAll('.key');
const operasi = document.querySelectorAll('.operasi');
const clear = document.querySelector('.clear');
const percent = document.querySelector('.percent');
const equal = document.querySelector('.equal');
const erase = document.querySelector('.erase');
const decimal = document.querySelector('.decimal');

key.forEach(item => {
    item.addEventListener('click', () => {
        if(score.textContent != '0' && !done){
            score.textContent += (item.getAttribute('data-key'));
        }else {
            score.textContent = (item.getAttribute('data-key'));
            done = false; 
        }

        if(operator == ''){
            num[0] = Number.parseFloat(score.textContent);
        }else {
            num[1] = Number.parseFloat(score.textContent);
        }
        
        
    });
});

operasi.forEach(item => {
    item.addEventListener('click', ()=> {
        if(score.textContent != '0' || history.textContent != ''){
            if(num[1]){
                num[0] = hitung(operator,...num);
                num[1] = 0;
            }
        operator = item.getAttribute('data-op');
        history.textContent = num[0] + operator;
        score.textContent = "0";
    }
    })
})

clear.addEventListener('click', () => {
    num = [0,0];
    operator = '';
    score.textContent = num[0];
    history.textContent = '';
});

erase.addEventListener('click', () => {
    if(history.textContent != ''){
        let temp2 = num[1].toString().split('')
        if(temp2[1]){
            temp2 = temp2.splice(0, temp2.length - 1).join('');
            num[1] = Number(temp2);
            score.textContent = num[1]
        }else if(temp2[0] == "0"){
            operator = '';
            history.textContent = '';
            score.textContent = num[0];
        }
        else {
            num[1] = 0;
            score.textContent = num[1]
        }
    }else {
        let temp1 = num[0].toString().split('')
        if(temp1[1]){
            temp1 = temp1.splice(0, temp1.length - 1).join('');
            num[0] = Number(temp1);
        }else {
            num[0] = 0;
        }
        score.textContent = num[0]
    }
})

equal.addEventListener('click', () => {
    num[0] = hitung(operator,...num); 
    operator = '';
    history.textContent = '';
    if(num[0] > 0 || num[0] < 0){
        score.textContent = num[0];
    }else {
        score.textContent = 0;
    }
    num[1] = 0;
    done = true;
})

percent.addEventListener('click', () => {
    if(history.textContent == ''){
        num[0] /= 100;
        score.textContent = num[0];
    }else {
        num[1] /= 100;
        score.textContent = num[1];
    }
})

decimal.addEventListener('click', () => {
    if(history.textContent != ''){
        let temp = num[1].toString();
        if(temp.includes('.')){
            temp = temp.split('').filter((number) => number != '.').join('');
            num[1] = Number(temp);  
            score.textContent = num[1] + '.';
        }else {
            score.textContent = num[1] + '.';
        }
    }else {
        let temp = num[0].toString();
        if(temp.includes('.')){
            temp = temp.split('').filter((number) => number != '.').join('');
            num[0] = Number(temp);  
            score.textContent = num[0] + '.';
        }else {
            score.textContent = num[0] + '.';
        }
    }
    
})
