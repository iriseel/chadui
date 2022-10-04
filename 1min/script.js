var narrations = document.querySelectorAll(".narration");
//var clicks = -1;
var audio = document.querySelector("audio");
audio.crossOrigin = "anonymous";
var video = document.querySelector("video");


document.querySelector('video').playbackRate = 0.6;
    
window.addEventListener('click', function(){
    
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
        audio_source = audioCtx.createMediaElementSource(audio),
        panNode = audioCtx.createStereoPanner();

    panNode.pan.value = -1;

    audio_source.connect(panNode).connect(audioCtx.destination);

    narrations[0].classList.add('show');

    audio.play();
    video.play();
    
    var myTimeout = setTimeout(narration_1, 5871);
});


function clear(){
    for(var i = 0; i < narrations.length; i++){
        narrations[i].classList.add('hidden');
        narrations[i].classList.remove('show');
    }
};


function narration_1() { 
    clear();
    narrations[1].classList.add('show');
    var myTimeout = setTimeout(narration_2, 3747);

};

function narration_2() { 
    clear();
    narrations[2].classList.add('show');
    var myTimeout = setTimeout(narration_3, 4460);

};

function narration_3() { 
    clear();
    narrations[3].classList.add('show');
    var myTimeout = setTimeout(narration_4, 3990);

};

function narration_4() { 
    clear();
    narrations[4].classList.add('show');
    var myTimeout = setTimeout(narration_5, 4833);

};

function narration_5() { 
    clear();
    narrations[5].classList.add('show');
    var myTimeout = setTimeout(narration_6, 11951);

};

function narration_6() { 
    clear();
    narrations[6].classList.add('show');
    var myTimeout = setTimeout(narration_end, 11000);

};

function narration_end() { 
    clear();
    video.pause();

};



//window.addEventListener('click', function(){
//    clicks++;
//
//    for(var i = 0; i < narrations.length; i++){
//        narrations[i].classList.add('hidden');
//        narrations[i].classList.remove('show');
//    }
//
//    narrations[clicks].classList.add('show');
//
//    audio.play();
//
//});