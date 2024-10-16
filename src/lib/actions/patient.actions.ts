"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Query, ID } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite-config";
import { parseStringify } from "../utils";
import { InputFile } from 'node-appwrite/file'

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    const userAppWrite = await parseStringify(newUser);
    return userAppWrite;
  } catch (error: any) {
    console.log("Error creating user", error.response);
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);
      return documents?.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error: any) {
    console.log("Error getting user", error.response);
  }
};

// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {

  console.log(patient)
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (identificationDocument) {
      const inputFile =
        identificationDocument &&
        InputFile.fromBuffer(
          identificationDocument.get("blobFile") as Blob,
          identificationDocument.get("fileName") as string
        );

        if(!inputFile) throw new Error('Error input file')

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    if(!file || file === undefined) throw new Error('File undefined')
    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    if(!DATABASE_ID) throw new Error('No database id provider')
    if(!PATIENT_COLLECTION_ID) throw new Error('No patient collection id provider')
    const newPatient = await databases.createDocument(
      DATABASE_ID,
      PATIENT_COLLECTION_ID,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
          : null,
        ...patient,
      }
    );
    return parseStringify(newPatient);
  } catch (error:any) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error:any) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error.response
    );
  }
};
