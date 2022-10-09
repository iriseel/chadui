var narrations = document.querySelectorAll(".narration");
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

document.querySelector('video').playbackRate = 0.6;
    
window.addEventListener('click', function(){
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
        audio_source = audioCtx.createMediaElementSource(audio),
        panNode = audioCtx.createStereoPanner();

    panNode.pan.value = 1;

    audio_source.connect(panNode).connect(audioCtx.destination);

    audio.play();
    video.play();

    change_narration();
//    console.log(narrations.length);
});


function change_narration(){

    for(var i = 0; i < narrations.length; i++){
        narrations[i].classList.add('hidden');
        narrations[i].classList.remove('show');
    }
    
    if (order >= narrations.length) {
        console.log("story ended");
        video.pause();
    }
    else {
        narrations[order].classList.add('show');

        var delay = delays[order];

        var myTimeout = setTimeout(change_narration, delay);
        
        order++;
        
    }
    
//    console.log(order);
}