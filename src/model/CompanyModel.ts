import { model, Schema } from "mongoose";

const CompanySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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

const CompanyModel = model("Company", CompanySchema);
export default CompanyModel;
