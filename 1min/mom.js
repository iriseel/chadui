var questions = document.querySelectorAll(".question");
//var clicks = -1;
var audio = document.querySelector("audio");
audio.crossOrigin = "anonymous";

    
window.addEventListener('click', function(){
    
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
        audio_source = audioCtx.createMediaElementSource(audio),
        panNode = audioCtx.createStereoPanner();

    panNode.pan.value = -1;

    audio_source.connect(panNode).connect(audioCtx.destination);

    questions[0].classList.add('show');

    audio.play();
    
    var myTimeout = setTimeout(question_1, 5871);
});


function clear(){
    for(var i = 0; i < questions.length; i++){
        questions[i].classList.add('hidden');
        questions[i].classList.remove('show');
    }
};


function question_1() { 
    clear();
    questions[1].classList.add('show');
    var myTimeout = setTimeout(question_2, 3747);

};

function question_2() { 
    clear();
    questions[2].classList.add('show');
    var myTimeout = setTimeout(question_3, 4460);

};

function question_3() { 
    clear();
    questions[3].classList.add('show');
    var myTimeout = setTimeout(question_4, 3990);

};

function question_4() { 
    clear();
    questions[4].classList.add('show');
    var myTimeout = setTimeout(question_5, 4833);

};

function question_5() { 
    clear();
    questions[5].classList.add('show');
    var myTimeout = setTimeout(question_6, 11951);

};

function question_6() { 
    clear();
    questions[6].classList.add('show');
    var myTimeout = setTimeout(question_end, 11000);

};

function question_end() { 
    clear();

};

