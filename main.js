song="";
status="";
objects=[];

function preload(){ 
song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("Status").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
    console.log("m0dElL0AdEd");
    status=true;
    console.log(status);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}

function draw(){
    image(video,0,0,600,400);
if(status=="true"){
R=random(255);
G=random(255);
B=random(255);

    objectDetector.detect(video,gotResult);
  for(i=0; i<objects.length; i++){
    document.getElementById("Status").innerHTML="Status: Objects Detected";
    if(objects[i].label=="person"){  
         document.getElementById("NUM_ppl").innerHTML="Person Found";
         song.stop()
        }
         else{
            document.getElementById("NUM_ppl").innerHTML="Person Not Found";
        song.play();
        }
      fill(R,G,B);
      percentage=floor(objects[i].confidence*100);
      text(objects[i].label+" "+percentage+"%",objects[i].x+25,objects[i].y+25);
      noFill();
      stroke(R,G,B);
      rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
  }
  if(objects.length==0){
    document.getElementById("NUM_ppl").innerHTML="Person Not Found";
    song.play();
  }
}

}