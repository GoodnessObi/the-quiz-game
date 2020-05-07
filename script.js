const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const question = document.querySelectorAll('.question');
let currentlySelected = 0;
// let optionButtons = document.querySelectorAll("input[type = 'radio']");
let counter = document.querySelector('.counter').innerHTML; 
// console.log(counter);

// console.log(optionButtons);
// console.log(question);
prevBtn.addEventListener('click', () => {
    question[currentlySelected].classList.remove('active'); currentlySelected--;
    question[currentlySelected].classList.add('active');
    nextBtn.disabled = false;

    if(currentlySelected ===0) {
        prevBtn.disabled = true;
    }

});

nextBtn.addEventListener('click', () =>{
    question[currentlySelected].classList.remove('active'); currentlySelected++;
    question[currentlySelected].classList.add('active');
    prevBtn.disabled = false;

    if(question.length === currentlySelected + 1) {
        nextBtn.disabled = true;
    }
    buttonClick();
});

function buttonClick() {
    question.forEach(div => {
        if(div.classList.contains('active')) {
            let labels= div.children[1];
            let optionButtons = labels.children
        for(let i = 0; i < optionButtons.length; i++) {
            optionButtons[i].addEventListener('click', (e) => {
                if(e.target.classList.contains('right-answer')) {
                    e.target.parentElement.classList.add('correct');
                    counter++;
                    document.querySelector('.counter').innerHTML = counter;
                    
                    for(let i = 0; i < optionButtons.length; i++) {
                        console.log(optionButtons[i]);
                        optionButtons[i].children[0].disabled = true;
                    }
                   
                } else {
                    e.target.parentElement.classList.add('wrong');
                    // document.getElementsByClassName('right-answer').parentElement.classList.add('correct');
                }
            }) 

        

      
        }
     
    }})
}




// optionButtons.forEach(item => {
//     // console.log(item);
//     // item.addEventListener('click', event => {
//     //  
        
//     // });
// });