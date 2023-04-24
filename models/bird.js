import mongoose from 'mongoose'

const Schema = mongoose.Schema

const instanceSchema = new Schema ({
  count: Number,
  behavior: String,
  date: String,
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
