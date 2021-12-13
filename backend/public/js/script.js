function displayBlock(){
    const inputArr = document.querySelectorAll('#divChoices input');
    for(let i = 0; i < 10; i++){
        if (inputArr[i].value == ""){
            inputArr[i].style.display='block';
            if (i == 9) {
                document.getElementById('btn_addChoice').style.display='none';
            }
            break;
        }
    }
}

const btn = document.getElementById('btn_addChoice');
btn.addEventListener('click', displayBlock);