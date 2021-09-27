import validUrl from 'valid-url'
import { IUrl, Url } from '@/models/url.model'
import ApiError from '@/utils/ApiError'
import express from 'express'
import httpStatus from 'http-status'
import shortid from 'shortid'

const router = express.Router()
const baseUrl: string = process.env.BaseUrl

router.get('/', async (req, res, next) => {
  // logger.debug('%o', req.user)
  const store = await Url.find()
  res.json(store)
})

router.get('/redirect/:shortUrl', async (req, res, next) => {
  try {
    const { shortUrl } = req.params
    const url: IUrl = await Url.findOne({ urlCode: shortUrl })
    if (!url) throw new ApiError(httpStatus.NOT_FOUND, 'Url not found')

    return res.status(302).redirect(url.longUrl)
  } catch (e) {
    next(e)
  }
})

router.post('/shorten', async (req, res, next) => {
  try {
    const { longUrl } = req.body

    if (!validUrl.isUri(longUrl)) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Url')

    const existingUrl = await Url.findOne({ longUrl })
    if (existingUrl) return res.status(200).json(existingUrl)

    const urlCode = shortid.generate()
    const shortUrl = `${req.protocol}://${req.get('host')}/url/redirect/${urlCode}`

    const urlItem = {
      urlCode,
      shortUrl,
      longUrl,
    }

    const url = new Url(urlItem)
    await url.save()
    res.json(url)
  } catch (e) {
    next(e)
  }
})

export default router
