import {Request, Response} from 'express'

import {OutputNotSpecifiedError} from '../../common/exceptions.common'
import { FaceDetectRepository } from '../../Repository'

const detectFace = async (req: Request, res: Response) => {
    try{
        const image: any = req.files.image
        const imageType: string = image.mimetype
        const faceDetectRepo = new FaceDetectRepository()

        switch(req.query.output){
            case 'json':
                const detections = await faceDetectRepo.detectFace(req.files.image['data'])
                res.send(detections)
                break
            case 'img':
                const outputImg: any = await faceDetectRepo.detectFace(req.files.image['data'], imageType, true)
                res.contentType(outputImg.type);
                res.send(outputImg.buffer)
                break
            default:
                throw new OutputNotSpecifiedError()
        }
    }
    catch(e){
        res.status(e && e.code && e.code || 404).send(e)
    }
}

const detectLandmark = async (req: Request, res: Response) => {
    try{
        const image: any = req.files.image
        const imageType: string = image.mimetype
        const faceDetectRepo = new FaceDetectRepository()

        switch(req.query.output){
            case 'json':
                const coords = await faceDetectRepo.detectLandmark(image['data'])
                res.send(coords)
                break
            case 'img':
                const outputImg: any = await faceDetectRepo.detectLandmark(image['data'], imageType, true)
                res.contentType(outputImg.type)
                res.send(outputImg.buffer)
                break
            default:
                throw new OutputNotSpecifiedError()
        }
    }
    catch(e){
        res.status(e && e.code && e.code || 404).send(e)
    }
}

const detectAgeGender = async (req: Request, res: Response) => {
    try{
        const image: any = req.files.image
        const imageType: string = image.mimetype
        const faceDetectRepo = new FaceDetectRepository()

        switch(req.query.output){
            case 'json':
                const coords = await faceDetectRepo.detectAgeGender(image['data'])
                res.send(coords)
                break
            case 'img':
                const outputImg: any = await faceDetectRepo.detectAgeGender(image['data'], imageType, true)
                res.contentType(outputImg.type)
                res.send(outputImg.buffer)
                break
            default:
                throw new OutputNotSpecifiedError()
        }
    }
    catch(e){
        res.status(e && e.code && e.code || 404).send(e)
    }
}

const detectExpression = async (req: Request, res: Response) => {
    try{
        const image: any = req.files.image
        const imageType: string = image.mimetype
        const faceDetectRepo = new FaceDetectRepository()

        switch(req.query.output){
            case 'json':
                const coords = await faceDetectRepo.detectExpresion(image['data'])
                res.send(coords)
                break
            case 'img':
                const outputImg: any = await faceDetectRepo.detectExpresion(image['data'], imageType, true)
                res.contentType(outputImg.type)
                res.send(outputImg.buffer)
                break
            default:
                throw new OutputNotSpecifiedError()
        }
    }
    catch(e){
        res.status(e && e.code && e.code || 404).send(e)
    }
}

export {
    detectFace,
    detectLandmark,
    detectAgeGender,
    detectExpression
}