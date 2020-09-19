// import nodejs bindings to native tensorflow,
// not required, but will speed up things drastically (python required)
import '@tensorflow/tfjs-node';

// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
import * as canvas from 'canvas';

import * as faceapi from 'face-api.js';

// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement, additionally an implementation
// of ImageData is required, in case you want to use the MTCNN
const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

await faceapi.loadSsdMobilenetv1Model('/models')
 //accordingly for the other models:
 await faceapi.loadTinyFaceDetectorModel('/models')
 await faceapi.loadMtcnnModel('/models')
 await faceapi.loadFaceLandmarkModel('/models')
 await faceapi.loadFaceLandmarkTinyModel('/models')
 await faceapi.loadFaceRecognitionModel('/models')
 await faceapi.loadFaceExpressionModel('/models')