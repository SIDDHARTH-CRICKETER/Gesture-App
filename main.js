Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:',ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/HhR-XT4hG/model.json',modelLoaded);

function modelLoaded() {
  console.log('Model Loaded!')
}

function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }


function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results); 
 document.getElementById("result_emotion_name").innerHTML = results[0].label;
 toSpeak = "";

    if(results[0].label == "Hand Scissor")
    {
      toSpeak = "Hand Scissor";
    document.getElementById("update_emoji").innerHTML = "&#128406;";
    }
    if(results[0].label == "Ok Hand Sign")
    {
      toSpeak = "Ok Hand Sign";  
    document.getElementById("update_emoji").innerHTML = "&#128076;";
     
    }
    if(results[0].label == "Victory")
    {
      toSpeak = "Victory";
	    document.getElementById("update_emoji").innerHTML = "&#9996;";
    }

    if(results[0].label == "Cross Finger")
    {
      toSpeak = "Cross Finger";
	    document.getElementById("update_emoji").innerHTML = "&#129310;";
    }
    if(results[0].label == "Yo")
    {
      toSpeak = "Yo";
	    document.getElementById("update_emoji").innerHTML = "&#129311;";
    }
    if(results[0].label == "Thumbs Up")
    {
      toSpeak = "Thumbs Up";
	    document.getElementById("update_emoji").innerHTML = "&#128077;";
    }
    speak();
  }
}

function speak(){
  var synth = window.speechSynthesis;

  speak_data = toSpeak;

  var utterThis = new SpeechSynthesisUtterance(speak_data);

  synth.speak(utterThis);

}