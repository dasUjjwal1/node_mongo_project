import { Request, Response } from "express";
import { errorMessage } from "src/constant/constant";
import CompanyModel from "src/model/CompanyModel";
import z from "zod";
export const createCompany = async (req: Request, res: Response) => {
  try {
    const companySchema = z.object({
      name: z.string().min(1),
      email: z.string().email(),
      contactNumber: z.number().positive(),
      countryCode: z.number(),
      profilePic: z.string().optional(),
      bio: z.string().optional(),
    });
    const { error, success, data } = companySchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ error });
    }
    const isCreated = await CompanyModel.exists({ email: data?.email });
    if (isCreated) {
      return res.status(400).json({ error: errorMessage.ALREADY_PRESENT });
    }
    const Company = new CompanyModel(data);
    const saveCompany = await Company.save();
    res.status(200).json({ id: saveCompany.id });
  } catch (error) {
    res.status(400).json({ message: JSON.stringify(error) });
  }
};
