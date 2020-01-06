import {Application, Router} from 'express'
import {UserController, faceDetectController} from './Controllers'

export class Routes{

    public routes(app: Application): void{

        const apiV1Router = Router()
        app.use('/api/v1', apiV1Router)
        
        app.get('/', UserController.testRoute)
        app.post('/signup', UserController.registerUser)

        apiV1Router.post('/detect', faceDetectController.detectFace)
        apiV1Router.post('/detect/res=img', faceDetectController.detectFaceWithImg)
    }
}