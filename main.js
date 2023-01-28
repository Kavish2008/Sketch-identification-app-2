function setup(){
 canvas=createCanvas(280,280) ;
 canvas.center() ;
 background('white') ; 
 canvas.mouseReleased(classifyCanvas) ;
 synth=window.speechSynthesis ;

}

function preload(){
classifiyer=ml5.imageClassifier("DoodleNet") ;
}

function draw (){
strokeWeight(13) ;
stroke('black') ;
if(mouseIsPressed) {
    line(pmouseX,pmouseY,mouseX,mouseY) ;
}
}

function classifyCanvas(){
    classifiyer.classify(canvas,gotResults) ;
}

function gotResults(error,results) {
    if(error) {
        console.log(error) ;
    }
    else{
        console.log(results) ;
        label=results[0].label ;
        confidence=Math.round(results[0].confidence*100) ;
        document.getElementById('label').innerHTML = 'Label: ' + label ;
        document.getElementById('confidence').innerHTML = 'Confidence: ' + confidence + " %" ;
        utterthis=new SpeechSynthesisUtterance("You have drawn " + label) ;
        synth.speak(utterthis) ; 
    }
}

function clear_canvas(){
    background('white') ;
}