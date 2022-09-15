import { mongoose } from 'mongoose'

const mongooseUserModel = mongoose.model(
  'User',
  {
    id: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, required: true },
    image: { type: String, required: true },
  },
  'users'
)

export default mongooseUserModel
