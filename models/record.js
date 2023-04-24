import mongoose from 'mongoose'

const Schema = mongoose.Schema

const recordSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  date: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  birds: [{type: Schema.Types.ObjectId, ref: "Bird"}]
}, {
  timestamps: true
})

const Record = mongoose.model('Record', recordSchema)

export {
  Record
}