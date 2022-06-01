objects = [];
status = "";

function setup() {
    canvas = createCanvas(480, 350);

    video = createCapture(VIDEO);
    video.size(480, 350);
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 350);
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == objectName) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = "Status: Objects Detected!";
                
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance("Object" + "Found");
                synth.speak(utterThis);
            }
            else {
                document.getElementById("status").innerHTML = "Status: Object is not Found";
            }
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        objects = results;
    }
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    objectName = document.getElementById("objectName").value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}