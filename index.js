


Promise.all([
faceapi.nets.tinyFaceDetector.loadFromUri('/assets/face-api/models'),
faceapi.nets.faceLandmark68Net.loadFromUri('/assets/face-api/models'),
faceapi.nets.faceRecognitionNet.loadFromUri('/assets/face-api/models'),
faceapi.nets.faceExpressionNet.loadFromUri('/assets/face-api/models'),
faceapi.nets.ageGendeNet.loadFromUri('/assets/face-api/models'),
faceapi.nets.ssdMobilenetv1.loadFromUri('a'),
]).then(startVideo);

video.addEventListener('play', async () =>  {    
    const canvas = faceapi.canvas = faceapi.createCanvasFromMedia(video)
    const canvasSize={
width:video.width,
height:video.height

    }
    faceapi.matchDimensions(canvas, canvasSize)
document.body.appendChild(canvas)
setInterval(async() => {
    const detections = await faceapi
    .detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender()
      const resizedDetections = faceapi.resizeResults(detections,canvasSize)
    canvas.getContext('2d').clearRect(0 , 0 , canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas,resizedDetections)
    faceapi.drawFaceLandmarks(canvas,resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas,resizedDetections)
    resizedDetections.forEach(element => {
        
        const{age,gender,genderProbability } = detection
        new faceapi.draw.DrawTextField([
            `${parseInt(age,10)} years`
            `${gender} (${parseInt(genderProbability *100,10 )})`
        ],detection.detection.box.topRIght).draw(canvas)
    })
}, 100)
})





