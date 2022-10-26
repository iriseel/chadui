var currentTime;
var testTime = 0;
var shadow = -50;
var left = 65;
var drawings = document.querySelectorAll(".drawing");
var images = document.querySelectorAll(".images");

const get_time = setInterval(() => {

//    currentTime = new Date().getSeconds();
    currentTime = new Date().getHours();
//    console.log(currentTime);
    
    if (testTime >= 23) {
        testTime = 0;
    }
    else { 
        shadow += (50 + 50) / 24;
        left -= (65 + 65) / 24;
        testTime++;
    }
    
    if (drawings) {
        
        drawings.forEach((drawing, i) => {
//            var shadow = currentTime * 6;
            
//            console.log(shadow);

            //https://insidethediv.com/select-css-pseudo-element-using-javascript
            drawing.style.setProperty('--drawingAfterTransform', 'skew(' + shadow + 'deg) scale(1,2) rotateX(180deg)');
            
            drawing.style.setProperty('--drawingAfterLeft', left + '%');

            var shadow_check = window.getComputedStyle(drawing, ':before').getPropertyValue('transform');

    //        console.log(shadow_check);
        });
    
    }
    
    if (images) {
    
        images.forEach((image, i) => {
            var shadow = currentTime * 6;

            image.style.setProperty('--imageAfterTransform', 'skew(50deg) scale(1,2) rotateX(' + shadow + 'deg)');

            var shadow_check = window.getComputedStyle(image, ':before').getPropertyValue('transform');

    //        console.log(shadow_check);
        });

    }

}, 1000);
