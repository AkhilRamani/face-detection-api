import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import {config} from 'dotenv'
import expressFileUpload from 'express-fileupload'

import '@tensorflow/tfjs-node'
import * as faceApi from 'face-api.js'
import {join} from 'path'

import {Routes} from './routes'

const app = express()
const routesPrv: Routes = new Routes()

config()
app.use(cors())
app.use(bodyParser.json())
app.use(expressFileUpload())
routesPrv.routes(app);

(async () => await faceApi.nets.ssdMobilenetv1.loadFromDisk(join(__dirname, '../models')))()

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
    .then(() => console.log('Connected to DB'))
    .catch(e => console.log('failed to connect DB', e))

export { app }