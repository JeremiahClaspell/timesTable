var multiples = 0; 
var multiplier = 0; 
var questionCount = 0; 
var timer = 0; 
var store = []; 

function getStartingData (){
    $('#startingQuestionForm').on('submit',function(event){
        event.preventDefault(); 
        multiples = $('#multiples').val(); 
        multiplier = $('#maxMultiplier').val(); 
        questionCount = $('#questionQuantity').val(); 
        timer = $('#timer').val();  
        $(startingQuestionForm).addClass("hidden"); 
        generateStore(multiples, multiplier, questionCount); 
    })
}

function generateStore (multiples, maxMult, questionCount){
    for (let i=0; i<questionCount; i++) {
        let question = {'multiple': multiples, 'multiplier': Math.floor(Math.random()*maxMult)}
        store.push(question); 
    }
    console.log(store); 
}

function handleEvents(){
    getStartingData(); 
}
$(handleEvents)