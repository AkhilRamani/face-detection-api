import {Request, Response} from 'express'

import {ImageNotAvailableError} from '../../common/exceptions.common'
import { FaceDetectRepository } from '../../Repository'

const detectFace = async (req: Request, res: Response) => {
    try{
        if(!(req.files && req.files.image)) throw new ImageNotAvailableError()

        const faceDetectRepo = new FaceDetectRepository()
        const detections = await faceDetectRepo.detectFace(req.files.image['data'])
        res.send(detections)
    }
    catch(e){
        console.log(e)
        res.status(e && e.code && e.code || 404).send()
    }
}

const detectFaceWithImg = async (req: Request, res: Response) => {
    try{
        if(!(req.files && req.files.image)) throw new ImageNotAvailableError()

        const faceDetectRepo = new FaceDetectRepository()
        const processedImg = await faceDetectRepo.detectFace(req.files.image['data'], true)
        res.contentType('image/png');
        res.send(processedImg)
    }
    catch(e){
        console.log(e)
        res.status(e && e.code && e.code || 404).send()
    }
}

export {
    detectFace,
    detectFaceWithImg
}