# ReconhecimentoFace
Projeto Desenvolvendo Skiils para o Conhecimento facial


Features
Face Recognition

Available Models

Face Detection Models
SSD Mobilenet V1
For face detection, this project implements a SSD (Single Shot Multibox Detector) based on MobileNetV1. The neural net will compute the locations of each face in an image and will return the bounding boxes together with it's probability for each face. This face detector is aiming towards obtaining high accuracy in detecting face bounding boxes instead of low inference time. The size of the quantized model is about 5.4 MB (ssd_mobilenetv1_model).

The face detection model has been trained on the WIDERFACE dataset and the weights are provided by yeephycho in this repo.

Tiny Face Detector
The Tiny Face Detector is a very performant, realtime face detector, which is much faster, smaller and less resource consuming compared to the SSD Mobilenet V1 face detector, in return it performs slightly less well on detecting small faces. This model is extremely mobile and web friendly, thus it should be your GO-TO face detector on mobile devices and resource limited clients. The size of the quantized model is only 190 KB (tiny_face_detector_model).

The face detector has been trained on a custom dataset of ~14K images labeled with bounding boxes. Furthermore the model has been trained to predict bounding boxes, which entirely cover facial feature points, thus it in general produces better results in combination with subsequent face landmark detection than SSD Mobilenet V1.

This model is basically an even tinier version of Tiny Yolo V2, replacing the regular convolutions of Yolo with depthwise separable convolutions. Yolo is fully convolutional, thus can easily adapt to different input image sizes to trade off accuracy for performance (inference time).





Detecting Faces
Detect all faces in an image. Returns Array<FaceDetection>:

const detections = await faceapi.detectAllFaces(input)
Detect the face with the highest confidence score in an image. Returns FaceDetection | undefined:

const detection = await faceapi.detectSingleFace(input)
By default detectAllFaces and detectSingleFace utilize the SSD Mobilenet V1 Face Detector. You can specify the face detector by passing the corresponding options object:

const detections1 = await faceapi.detectAllFaces(input, new faceapi.SsdMobilenetv1Options())
const detections2 = await faceapi.detectAllFaces(input, new faceapi.TinyFaceDetectorOptions())
You can tune the options of each face detector as shown here.

Detecting 68 Face Landmark Points
After face detection, we can furthermore predict the facial landmarks for each detected face as follows:

Detect all faces in an image + computes 68 Point Face Landmarks for each detected face. Returns Array<WithFaceLandmarks<WithFaceDetection<{}>>>:

const detectionsWithLandmarks = await faceapi.detectAllFaces(input).withFaceLandmarks()
Detect the face with the highest confidence score in an image + computes 68 Point Face Landmarks for that face. Returns WithFaceLandmarks<WithFaceDetection<{}>> | undefined:

const detectionWithLandmarks = await faceapi.detectSingleFace(input).withFaceLandmarks()
You can also specify to use the tiny model instead of the default model:

const useTinyModel = true
const detectionsWithLandmarks = await faceapi.detectAllFaces(input).withFaceLandmarks(useTinyModel)
Computing Face Descriptors
After face detection and facial landmark prediction the face descriptors for each face can be computed as follows:

Detect all faces in an image + compute 68 Point Face Landmarks for each detected face. Returns Array<WithFaceDescriptor<WithFaceLandmarks<WithFaceDetection<{}>>>>:

const results = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors()
Detect the face with the highest confidence score in an image + compute 68 Point Face Landmarks and face descriptor for that face. Returns WithFaceDescriptor<WithFaceLandmarks<WithFaceDetection<{}>>> | undefined:

const result = await faceapi.detectSingleFace(input).withFaceLandmarks().withFaceDescriptor()
