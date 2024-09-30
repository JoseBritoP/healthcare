"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Query,ID } from "node-appwrite";
import { users } from "../appwrite-config";
import { parseStringify } from "../utils";

export const createUser = async (user:CreateUserParams) => {
  try {
    const newUser = await users.create(ID.unique(),user.email,user.phone, undefined,user.name)
    const userAppWrite = await parseStringify(newUser);
    return userAppWrite
  } catch (error:any) {
    console.log('Error',error)
    if(error && error?.code===409){
      const documents = await users.list([
        Query.equal('email',[user.email])
      ]);
      return documents?.users[0]
    }
  }
};

export const getUser = async(userId:string)=>{
  try {
    const user = await users.get(userId);
    return parseStringify(user)
  } catch (error:any) {
    console.log('Error getting user',error.response)
  }
}
