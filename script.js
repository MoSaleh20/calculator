let button = document.getElementsByClassName('clickable');
let result = document.getElementById('result');
let theme_mode = document.getElementsByClassName('theme-mode');
let dot = document.getElementById('dot');
let theme = document.getElementById('theme-style');
let add = document.getElementById('plus');
let subtract = document.getElementById('minus');
let multiply = document.getElementById('mult');
let divide = document.getElementById('div');

let savedTheme = localStorage.getItem('theme');
if (savedTheme==null){ 
    savedTheme = 'default' 
}
setTheme(savedTheme)

operationsAbility(true);
var first = 0;
var second = 0;
var operator;
var side = 0;

for (var i =0; i<button.length; i++){
    button[i].addEventListener('click',function(){
        if (this.name == 'num'){
            factor(this.value);
            if (side == 0){
                operationsAbility(false);
            }
        }
        else{
            switch(this.id){
            case 'clear': clearOperation(); break;
            case 'equal': equalOperation(); break;
            default: operationFunc(this.name); break;
        }
        }
    })
}

for (var i = 0; i<theme_mode.length;i++){
    theme_mode[i].addEventListener('click',function(){
        setTheme(this.dataset.mode)
    })
}
function factor(num){
        switch(side){
            case 0: 
                first = first + num;
                if (num=='.'){
                    result.value = Number(first)+'.';
                    dot.disabled = true;
                }
                else{
                   result.value = Number(first); 
                }
                break;  
            case 1:
                second= second + num;
                if (num=='.'){
                    result.value = Number(second)+'.';
                    dot.disabled = true;
                }
                else{
                operationsAbility(true);
                result.value = Number(second);
                }
                break; 
            default:
            }
        }

function clearOperation(){
    restart('');
}

function equalOperation(){
    switch(operator){
        case '-': res = Number(first) - Number(second);
        break;
        case '+': res = Number(first) + Number(second);
        break;
        case '*': res = Number(first) * Number(second);
        break;
        case '/': res = Number(first) / Number(second);
        break;
    }
    restart(res.toFixed(2));
}

function operationFunc(op){
    operator = op;
    result.value = op;
    side = 1;
    dot.disabled = false;
}

function operationsAbility(able){
        add.disabled = able;
        multiply.disabled =able;
        divide.disabled = able;
        subtract.disabled = able;
}

function restart(res){
    result.value = res;
        first = 0;
        second = 0;
        operator;
        side = 0;
        dot.disabled = false;
        operationsAbility(true);
}

function setTheme(mode){
    console.log(mode)
    switch(mode){
        case 'black-theme': theme.href='black.css'; break
        default: theme.href='style.css'
}
    localStorage.setItem('theme', mode)
}