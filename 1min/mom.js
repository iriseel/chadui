var questions = document.querySelectorAll(".question");
//var clicks = -1;
var order = 0;
var audio = document.querySelector("audio");
audio.crossOrigin = "anonymous";
var video = document.querySelector("video");
var delays = [
    5871,
    3747,
    4460,
    3990,
    4833,
    11951,
    11000
]
    
window.addEventListener('click', function(){
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
        audio_source = audioCtx.createMediaElementSource(audio),
        panNode = audioCtx.createStereoPanner();

    panNode.pan.value = -1;

    audio_source.connect(panNode).connect(audioCtx.destination);

    audio.play();

    change_question();
//    console.log(questions.length);
});


function change_question(){

    for(var i = 0; i < questions.length; i++){
        questions[i].classList.add('hidden');
        questions[i].classList.remove('show');
    }
    
    if (order >= questions.length) {
        console.log("story ended");
    }
    else {
        questions[order].classList.add('show');

        var delay = delays[order];

        var myTimeout = setTimeout(change_question, delay);
        
        order++;
        
    }
    
//    console.log(order);
}
