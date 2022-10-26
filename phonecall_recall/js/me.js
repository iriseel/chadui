var drawings = document.querySelectorAll(".drawing");
var audio_chinese = document.querySelector(".chinese");
var audio_english = document.querySelector(".english");
var audios = document.querySelectorAll("audio");

//[...] is a spread operator that turns a nodelist (.querySelectorAll gathers elements into nodes) into an array
//.map() is an array method that maps values from one array into another
//What I'm doing here is creating an array of objects, where each object's properties correspond to the x, y, right, bottom, and element values of each drawing 
var drawing_rects = [...drawings].map((drawing, i) => {
    var drawing_rect = drawing.getBoundingClientRect(),
        drawing_x = drawing_rect.x,
        drawing_y = drawing_rect.y,
        drawing_right = drawing_rect.right,
        drawing_bottom = drawing_rect.bottom;

    //.map() requires a return statement in order to know what to map from 1st array into 2nd array, .map() maps 1st array into whatever is inside of return statement. .map() returns the 2nd array.
    return {
        x: drawing_x,
        y: drawing_y,
        right: drawing_right,
        bottom: drawing_bottom,
        el: drawing,
        traced: false
    };

});

window.addEventListener("touchstart", init);

function init() {
    var audioCtx_chinese = new (window.AudioContext || window.webkitAudioContext)(),
        audioCtx_english = new (window.AudioContext || window.webkitAudioContext)(),
        audio_source_chinese = audioCtx_chinese.createMediaElementSource(audio_chinese),
        audio_source_english = audioCtx_english.createMediaElementSource(audio_english);
        panNode_chinese = audioCtx_chinese.createStereoPanner();
        panNode_english = audioCtx_english.createStereoPanner();
    
//    console.log(audioCtx);
    
    panNode_chinese.pan.value = 1;
    panNode_english.pan.value = -1;

    audio_source_chinese.connect(panNode_chinese).connect(audioCtx_chinese.destination); audio_source_english.connect(panNode_english).connect(audioCtx_english.destination);
    
    //on mobile + when the trigger gesture isn't "click", it needs to have audio load and play in 2 separate events for audio to play, otherwise returns error
    //^answer found here: https://arrangeactassert.com/posts/how-to-fix-the-request-is-not-allowed-by-the-user-agent-or-the-platform-in-the-current-context-possibly-because-the-user-denied-permission/
    audio_chinese.load();
    audio_english.load();
    
    //must removeEventListener or else entire function is run anew each time window is clicked
    window.removeEventListener("touchstart", init);
    
    //audio plays in separate event
    //?? Do I need to remove this event listener too in drawings_events()??
    window.addEventListener("touchstart", drawings_events);
}

function drawings_events() {
    
    document.querySelector(".instructions").style.opacity = "0";
    
    window.addEventListener('touchmove', full_opacity);
        
    //simply trying to change the opacity of a drawing that triggers touchmove didn't work (opacity only changed on the first drawing that is touched in a gesture), so going with this more complicated route:
    function full_opacity(event){

        //getting the x and y coordinates of each touch
        var touch_x = event.touches[0].clientX,
            touch_y = event.touches[0].clientY;
        
        //checking if a touch is happening within the bounding box of a drawing
        drawing_rects.forEach((drawing_rect, i) => {
            
            var touch_x_is_in_drawing = touch_x > drawing_rect.x && touch_x < drawing_rect.right;
            var touch_y_is_in_drawing = touch_y > drawing_rect.y && touch_y < drawing_rect.bottom;
            
            var touch_is_in_drawing = touch_x_is_in_drawing && touch_y_is_in_drawing;
            
            //if touch is happening within the bounding box of a drawing, then change that drawing
            if (touch_is_in_drawing) {
                
                drawing_rect.el.style.opacity = "1";
                
                drawing_rect.traced = true;
            }
              
        });
        
    };

    drawings.forEach((drawing, i) => {
        
        drawing.addEventListener('touchmove', playAudio);
        drawing.addEventListener('touchend', pauseAudio);
        
        function playAudio(){

            audio_chinese.play();
            audio_english.play();
            
            const restoreAudio = setInterval(() => {

              audios.forEach((audio, i) => {
                             
              if (audio.volume >= .9) {
                clearInterval(restoreAudio);
              }
                else {
                    
                audio.volume += 0.1;
                }
              });
                         
            }, 50);
        };
        
        function pauseAudio() {
            
            audio_chinese.pause();
            audio_english.pause();
            
            const fadeAudio = setInterval(() => {

                audios.forEach((audio, i) => {
                    
                  if (audio.volume < 0.1) {
                    clearInterval(fadeAudio);
                  }
                    else {
                        audio.volume -= 0.1;
                    }
                });
            }, 50);
        };
        
    });
    
    //??How to get this .every to run properly? Trying to check if every traced property for every drawing_rect is true??
    var check_traced = setInterval(() => {
        
        function all_traced(element) {
            return element = true;
        };
        
        drawing_rects.every(all_traced);
                                  
        if (all_traced) {
            console.log("next page!!!!");
        }
        else {
            console.log("checking");
        }
    }, 1000);
    
};
