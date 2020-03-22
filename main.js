var multiples = 0; 
var multiplier = 0; 
var questionCount = 0; 
var timer = 0; 

function getStartingData (){
    $('#startingQuestionForm').on('submit',function(event){
        event.preventDefault(); 
        multiples = $('#multiples').val(); 
        multiplier = $('#maxMultiplier').val(); 
        questionCount = $('#questionQuantity').val(); 
        timer = $('#timer').val();  
        $(startingQuestionForm).addClass("hidden"); 
    })
}
function logMultiples(m){
    console.log(multiples); 
    console.log(multiplier);
    console.log(questionCount); 
    console.log(timer); 
}

function handleEvents(){
    getStartingData(); 
}
$(handleEvents)