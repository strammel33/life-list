import mongoose from 'mongoose'

const Schema = mongoose.Schema

const instanceSchema = new Schema ({
  count: Number,
  behavior: String,
  record: {type: Schema.Types.ObjectId, ref: "Record"}
  }, {
    timestamps: true
})

const birdSchema = new Schema({
  name: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  instances: [instanceSchema],
}, {
  timestamps: true,
})

const Bird = mongoose.model('Bird', birdSchema)

export {
  Bird
}
