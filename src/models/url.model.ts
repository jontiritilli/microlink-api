import { Schema, Document, model } from 'mongoose'

export interface IUrl {
  urlCode: string
  longUrl: string
  shortUrl: string
  date: Date
}

export default interface IUrlModel extends Document, IUrl {}

const schema = new Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  date: {
    type: String,
    default: Date.now,
  },
})

export const Url = model<IUrlModel>('Url', schema)
