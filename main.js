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
    generateQuestions(); 
}

function generateQuestions () {
    for(let i=0; i<questionCount; i++){
    $('#main').append('<form '+`class="question${i} question hidden"`+ '><label for="answer">' + `what is <span class="js-multiple">${store[i].multiple}</span> * <span class="js-multiplier">${store[i].multiplier}</span>` + '</label><input name="answer" id="answer" required type="number"> <button type="submit" id="js-answer-submit">Check Answer</button> </form>')
    }
    $('.question0').removeClass('hidden'); 
}

function checkAnswer(){
    $('#main').on('submit', '.question', function(event){
        event.preventDefault(); 
        let multiple = parseInt($(this).find('.js-multiple').text()); 
        console.log($(this)); 
        console.log(multiple); 
        let multiplier = parseInt($(this).find('.js-multiplier').text()); 
        console.log(multiplier); 
        let answer = parseInt($(this).find('#answer').val()); 
        if(multiple*multiplier === answer) {
            $(this).find('#js-answer-submit').text('Next Question').addClass('nextButton').parent().append('<p>True</p>') 
        } else {
            $(this).find('#js-answer-submit').text('Next Question').addClass('nextButton').parent().append('<p>False</p>')
        }; 
       
    })
}

function handleEvents(){
    getStartingData(); 
    checkAnswer(); 
}
$(handleEvents)
