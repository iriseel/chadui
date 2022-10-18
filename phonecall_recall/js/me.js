var drawings = document.querySelectorAll(".drawing");
var audio = document.querySelector("audio");

window.addEventListener("click", init);

function init() {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
        audio_source = audioCtx.createMediaElementSource(audio),
        panNode = audioCtx.createStereoPanner();
    
    panNode.pan.value = 1;

    audio_source.connect(panNode).connect(audioCtx.destination);
    
    drawings.forEach((drawing, i) => {
        
        drawing.addEventListener('mouseover', function(){
            
            audio.play();
            
            const restoreAudio = setInterval(() => {

              if (audio.volume >= .9) {
                clearInterval(restoreAudio);
              }
                else {
                    
                audio.volume += 0.1;
                }
            }, 50);
        });
         
        drawing.addEventListener('mouseout', function() {
            
            audio.pause();
            
            const fadeAudio = setInterval(() => {

              if (audio.volume < 0.1) {
                clearInterval(fadeAudio);
              }
                else {
                    audio.volume -= 0.1;
                }
            }, 50);
        });

    });
    
    
    //must removeEventListener or else entire function is run anew each time window is clicked
    window.removeEventListener("click", init);
}

