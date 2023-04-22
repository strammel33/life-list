import mongoose from 'mongoose'

const Schema = mongoose.Schema

const recordSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  date: {type: Date, required: true},
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const Record = mongoose.model('Record', recordSchema)

export {
  Record
}