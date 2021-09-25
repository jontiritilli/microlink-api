import express from 'express'
import url from './url.route'

const router = express.Router()

router.use('/url', url)

export default router
