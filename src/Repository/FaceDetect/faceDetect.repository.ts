import * as faceApi from 'face-api.js'
import {join} from 'path';

import {canvas} from './env'
import {faceDetectionOptions} from './faceDetection'

export class FaceDetectRepository{

    async detectFace(inputImage: Buffer, returnImage: boolean = false){
        
        // await faceApi.nets.ssdMobilenetv1.loadFromDisk(join(__dirname, '../../../models'))

        // const image = await canvas.loadImage(join(__dirname, '../../../imgs/test.jpeg'))

        const image = await canvas.loadImage(inputImage)
        const detections = await faceApi.detectAllFaces(image, faceDetectionOptions)

        const processedCanvas = faceApi.createCanvasFromMedia(image) as any
        faceApi.draw.drawDetections(processedCanvas, detections)
        
        // res.send(processedCanvas.toDataURL("image/png"))

        if(!returnImage){
            return detections
        }
        else{
            return processedCanvas.toBuffer('image/png')
        }
    }
}