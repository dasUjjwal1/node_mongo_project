import { Router } from "express";
import { createCompany } from "src/controller/companyController";

const router = Router();
router.post("/create", createCompany);
export default router;
