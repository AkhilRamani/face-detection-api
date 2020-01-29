import * as faceApi from 'face-api.js'
import {join} from 'path';

import {canvas} from './env'
import {faceDetectionOptions} from './faceDetection'

export class FaceDetectRepository{

    async detectFace(inputImage: Buffer, mimetype: string = 'image/jpeg', withImage: boolean = false){
        
        // await faceApi.nets.ssdMobilenetv1.loadFromDisk(join(__dirname, '../../../models'))
        const image = await canvas.loadImage(inputImage)
        const detections = await faceApi.detectAllFaces(image, faceDetectionOptions)

        if(!withImage){
            return detections
        }
        else{
            const processedCanvas = faceApi.createCanvasFromMedia(image) as any
            faceApi.draw.drawDetections(processedCanvas, detections)
            return {buffer: processedCanvas.toBuffer(mimetype), type: mimetype}
            // res.send(processedCanvas.toDataURL("image/png"))
        }
    }

    async detectLandmark(inputImage: Buffer, mimetype: string = 'image/jpeg', withImage: boolean = false){
        await faceApi.nets.faceLandmark68Net.loadFromDisk(join(__dirname, '../../../models'))
        const image = await canvas.loadImage(inputImage)
        const results = await faceApi.detectAllFaces(image, faceDetectionOptions).withFaceLandmarks()

        if(!withImage){
            return results
        }
        else{
            const outputCanvas = faceApi.createCanvasFromMedia(image) as any
            faceApi.draw.drawDetections(outputCanvas, results.map(res => res.detection))
            faceApi.draw.drawFaceLandmarks(outputCanvas, results.map(res => res.landmarks))
            return {buffer: outputCanvas.toBuffer(mimetype), type: mimetype}
        }
    }

    async detectAgeGender(inputImage: Buffer, mimetype: string = 'image/jpeg', withImage: boolean = false){
        await faceApi.nets.ageGenderNet.loadFromDisk(join(__dirname, '../../../models'))

        const image = await canvas.loadImage(inputImage)
        const results = await faceApi.detectAllFaces(image, faceDetectionOptions).withAgeAndGender()

        if(!withImage){
            return results
        }
        else{
            const outputCanvas = faceApi.createCanvasFromMedia(image) as any
            faceApi.draw.drawDetections(outputCanvas, results.map(res => res.detection))
            results.forEach(result => {
                const {age, gender, genderProbability} = result
                new faceApi.draw.DrawTextField(
                    [
                        `${faceApi.utils.round(age, 0)} years`,
                        `${gender} (${faceApi.utils.round(genderProbability)})`
                    ],
                    result.detection.box.bottomLeft
                ).draw(outputCanvas)
            })

            return {buffer: outputCanvas.toBuffer(mimetype), type: mimetype}
        }
    }

    async detectExpresion(inputImage: Buffer, mimetype: string = 'image/jpeg', withImage: boolean = false){
        await faceApi.nets.faceExpressionNet.loadFromDisk(join(__dirname, '../../../models'))

        const image = await canvas.loadImage(inputImage)
        const results = await faceApi.detectAllFaces(image, faceDetectionOptions).withFaceExpressions()

        if(!withImage){
            return results
        }
        else{
            const outputCanvas = faceApi.createCanvasFromMedia(image) as any
            faceApi.draw.drawDetections(outputCanvas, results.map(res => res.detection))
            faceApi.draw.drawFaceExpressions(outputCanvas, results)
            return {buffer: outputCanvas.toBuffer(mimetype), type: mimetype}
        }
    }

}