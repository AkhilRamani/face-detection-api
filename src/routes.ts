import {Application, Router} from 'express'
import {UserController, faceDetectController} from './Controllers'
import { preQueryCheckMiddleware } from './middleware/middleware'

export class Routes{

    public routes(app: Application): void{

        const apiV1Router = Router()
        app.use('/api/v1', apiV1Router)
        
        app.get('/', UserController.testRoute)
        app.post('/signup', UserController.registerUser)

        apiV1Router.post('/detect', preQueryCheckMiddleware, faceDetectController.detectFace)
        apiV1Router.post('/detect/landmark', preQueryCheckMiddleware,faceDetectController.detectLandmark)
    }
}