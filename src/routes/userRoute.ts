import { Router } from "express";
import { createUser, getUserDetails } from "src/controller/userController";

const router = Router();
router.post("/create", createUser);
router.get("/user-details/:userId", getUserDetails);
export default router;
