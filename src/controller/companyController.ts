import { Request, Response } from "express";
import { errorMessage } from "src/constant/constant";
import CompanyModel from "src/model/CompanyModel";
import UserModel from "src/model/UserModel";
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
      res.status(400).json({ error });
      return;
    }
    const isCreated = await CompanyModel.exists({ email: data?.email });
    if (isCreated) {
      res.status(400).json({ error: errorMessage.ALREADY_PRESENT });
      return;
    }
    const Company = new CompanyModel(data);
    const saveCompany = await Company.save();
    res.status(200).json({ id: saveCompany.id });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getUserByCompanyId = async (req: Request, res: Response) => {
  try {
    const reqBodySchema = z.object({
      companyId: z.string(),
    });
    const { error, success, data } = reqBodySchema.safeParse(req.body);
    if (!success) {
      res.status(400).json({ error });
      return;
    }
    const userList = await UserModel.find({ companyId: data?.companyId });
    res.status(200).json({ data: userList });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getAllCompany = async (req: Request, res: Response) => {
  try {
    const companyList = await CompanyModel.find();
    res.status(200).json({ data: companyList });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getCompanyDetails = async (req: Request, res: Response) => {
  try {
    const reqBodySchema = z.object({
      companyId: z.string(),
    });
    const { error, success, data } = reqBodySchema.safeParse(req.params);
    if (!success) {
      res.status(400).json({ error });
      return;
    }
    const companyDetails = await CompanyModel.findById(data.companyId);
    res.status(200).json({ data: companyDetails });
  } catch (error) {
    res.status(400).json({ error });
  }
};
