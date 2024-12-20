import { model, Schema } from "mongoose";
import { Collections } from "src/constant/constant";

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

const CompanyModel = model(Collections.Company, CompanySchema);
export default CompanyModel;
