var multiples = 0; 
var multiplier = 0; 
var questionCount = 0;  
var store = []; 
var questionCounter = 1; 
var answeredCorrectly = 0; 

function getStartingData (){
    $('#startingQuestionForm').on('submit',function(event){
        event.preventDefault(); 
        multiples = $('#multiples').val(); 
        multiplier = $('#maxMultiplier').val(); 
        questionCount = parseInt($('#questionQuantity').val())+1; 
        $(startingQuestionForm).addClass("hidden"); 
        generateStore(multiples, multiplier, questionCount); 
        questionNumber(); 
    })
}

function questionNumber (){
    $('.questionNumber').removeClass('hidden').replaceWith('<p class="questionNumber">Question number '+questionCounter +"/"+(questionCount-1)+"</p>")
}

function answeredCorrectCounter (){
    $('.answeredCorrectly').replaceWith('<p class="answeredCorrectly">you have answered '+answeredCorrectly+'/'+questionCounter+' correctly</p>'); 
}

function generateStore (multiples, maxMult, questionCount){
    for (let i=0; i<questionCount; i++) {
        let question = {'multiple': multiples, 'multiplier': Math.floor(Math.random()*maxMult)}
        store.push(question); 
    }
    generateQuestions(); 
}

function generateQuestions () {
    for(let i=1; i<questionCount; i++){
    $('#main').append('<form '+`class="question${i} question hidden unanswered"`+ '><label for="answer">' + `what is <span class="js-multiple">${store[i].multiple}</span> * <span class="js-multiplier">${store[i].multiplier}</span>` + '</label><input name="answer" id="answer" required type="number"> <button type="submit" id="js-answer-submit">Check Answer</button> </form>')
    }
    $('.question1').removeClass('hidden'); 
}

function checkAnswer(){
    $('#main').on('submit', '.unanswered', function(event){
        event.preventDefault(); 
        let multiple = parseInt($(this).find('.js-multiple').text()); 
        let multiplier = parseInt($(this).find('.js-multiplier').text()); 
        let answer = parseInt($(this).find('#answer').val()); 
        if(multiple*multiplier === answer) {
            $(this).find('#js-answer-submit').text('Next Question').addClass('nextButton').parent().addClass(
                'answered'
            ).removeClass('unanswered'); 
            $('.questionResult').removeClass('hidden').replaceWith('<p>True</p>'); 
            answeredCorrectly++;  
        } else {
            $(this).find('#js-answer-submit').text('Next Question').addClass('nextButton').removeClass('unanswered').parent().addClass('answered')
            $('.questionResult').removeClass('hidden').replaceWith('<p>False</p>')
        };
        if($('.question').hasClass('question'+(questionCount-1))){ 
            $('#js-answer-submit').text('Finish Quiz').parent().addClass('finishQuiz');  
        }
        $('.answeredCorrectly').removeClass('hidden')
        questionNumber(); 
        answeredCorrectCounter();   
    })
}

//working on getting the true/false to only show 1 instince of itself, and display when triggered by the if statement. might create 2 <p> 1 with true and 1 with false is hidden until Called.

function nextQuestion () {
    $('#main').on('submit', '.answered', function(event){
        event.preventDefault(); 
        $('.question'+questionCounter).addClass('hidden'); 
        questionCounter++; 
        $('.question'+questionCounter).removeClass('hidden'); 
        questionNumber(); 
        $('.questionResult').addClass('hidden')
    }); 
}

function endQuiz(){
    $('#main').on('submit','.finishQuiz', function(event){
    $('.questionNumber').addClass('results'); 
    $('.answeredCorrectly').addClass('results'); 
    questionCounter-=1
    questionNumber(); 
})
}


function handleEvents(){
    getStartingData(); 
    checkAnswer(); 
    nextQuestion(); 
    endQuiz(); 
}
$(handleEvents)
