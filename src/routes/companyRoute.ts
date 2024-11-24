import { Router } from "express";
import {
  createCompany,
  getAllCompany,
  getCompanyDetails,
  getUserByCompanyId,
} from "src/controller/companyController";

const router = Router();
router.post("/create", createCompany);
router.post("/get-all-user", getUserByCompanyId);
router.get("/list", getAllCompany);
router.get("/details/:companyId", getCompanyDetails);
export default router;
