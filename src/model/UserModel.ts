import { model, Schema } from "mongoose";
import { Collections } from "src/constant/constant";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: Collections.Company,
    index: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  countryCode: {
    type: Number,
    required: true,
  },
  profilePic: {
    type: String,
    default: "default.png",
  },
  bio: {
    type: String,
  },
});

const UserModel = model(Collections.User, UserSchema);
export default UserModel;
