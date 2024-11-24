import { Request, Response } from "express";
import { Collections, errorMessage } from "src/constant/constant";
import UserModel from "src/model/UserModel";
import z from "zod";
export const createUser = async (req: Request, res: Response) => {
  try {
    const companySchema = z.object({
      name: z.string().min(1),
      email: z.string().email(),
      contactNumber: z.number().positive(),
      countryCode: z.number(),
      profilePic: z.string().optional(),
      bio: z.string().optional(),
      companyId: z.string(),
    });
    const { error, success, data } = companySchema.safeParse(req.body);
    if (!success) {
      res.status(400).json({ error });
      return;
    }
    const isCreated = await UserModel.exists({ email: data?.email });
    if (isCreated) {
      res.status(400).json({ error: errorMessage.ALREADY_PRESENT });
      return;
    }
    const Company = new UserModel(data);
    const saveCompany = await Company.save();
    res.status(200).json({ id: saveCompany.id });
  } catch (error) {
    res.status(400).json({ message: JSON.stringify(error) });
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const userIdSchema = z.object({
      userId: z.string().min(1),
    });
    const { error, success, data } = userIdSchema.safeParse(req.params);
    if (!success) {
      res.status(400).json({ error });
      return;
    }
    const userDetails = await UserModel.findById(data.userId)
      .populate("companyId")
      .exec();
    res.status(200).json({ data: userDetails });
  } catch (error) {
    res.status(400).json({ message: JSON.stringify(error) });
  }
};
