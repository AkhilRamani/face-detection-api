import {Request, Response} from 'express'
import {join} from 'path'
import '@tensorflow/tfjs-node'
import * as faceApi from 'face-api.js'

import {canvas, faceDetectionNet, faceDetectionOptions} from '../../common'

const detectFace = async (req: Request, res: Response) => {
    try{

        await faceApi.nets.ssdMobilenetv1.loadFromDisk(join(__dirname, '../../../models'))

        const image = await canvas.loadImage(join(__dirname, '../../../imgs/test.jpeg'))
        const detections = await faceApi.detectAllFaces(image, faceDetectionOptions)
        
        res.send(detections)
    }
    catch(e){
        console.log(e)
        res.status(404).send()
    }

}

export {
    detectFace
}