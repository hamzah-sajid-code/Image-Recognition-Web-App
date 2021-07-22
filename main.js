Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById('camera');

Webcam.attach('#camera');


function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById('output').innerHTML = "<img id='captured_image' src="+data_uri+">";
    })
}
console.log('ML5.js Version: '+ml5.version);

classifire = ml5.imageClassifier('https://storage.googleapis.com/tm-model/gQ6QY8JW1/model.json', modelLoaded);
function modelLoaded(){
    console.log('modelLoaded');
}
function check(){
    img = document.getElementById('captured_image');
    classifire.classify(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        if(results[0].label == 'Pen'){
            document.getElementById('object_identify').innerHTML = results[0].label.replace('Pen', 'Watch');
        }else{
        document.getElementById('object_identify').innerHTML = results[0].label;
        }
        document.getElementById('object_identify_accuracy').innerHTML = results[0].confidence.toFixed(3);
    }
}