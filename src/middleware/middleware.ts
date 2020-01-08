import {Request, Response} from 'express'
import { ImageNotAvailableError, OutputNotSpecifiedError } from '../common/exceptions.common'
import _ from 'lodash'

export const preQueryCheckMiddleware = (req: Request, res: Response, next: Function) => {
    try{
        if(!req.files || !req.files.image) throw new ImageNotAvailableError()
        else if(!req.query['output']) throw new OutputNotSpecifiedError()
        next()
    }
    catch(e){
        res.status(e && e.code && e.code).send(e)
    }
}