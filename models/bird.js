import mongoose from 'mongoose'

const Schema = mongoose.Schema

const birdSchema = new Schema({
  name: {type: String, required: true},
  count: {type: Number},
  behavior: {type: String},
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  collectedDuring: [{type: Schema.Types.ObjectId, ref: "Record"}]
}, {
  timestamps: true,
})

const Bird = mongoose.model('Bird', birdSchema)

export {
  Bird
}
