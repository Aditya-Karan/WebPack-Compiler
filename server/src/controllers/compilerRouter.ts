import { Request, Response } from "express";
import { Code } from "../models/Code";

export const saveCode=async (req:Request,res:Response)=>{
    const {fullCode}=req.body;
    try{
        const newCode=await Code.create({
            fullCode: fullCode
        })
        
        return res.status(201).send({url:newCode._id,status:"saved!"});
    }
    catch(error){
        res.status(500).send({error});
    }
}

export const loadCode=async (req:Request ,res:Response)=>{
    const {urlId}=req.body;
    try{
        const existingCode=await Code.findById(urlId);
        if(!existingCode){
            return res.status(404).send({meassage:"Code not found"});
        }
        return res.status(200).send({fullCode:existingCode.fullCode})
    }
    catch(err){
        return res.status(500).send({message:"Error loading code",err});
    }
}