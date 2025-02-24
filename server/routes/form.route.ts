import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { getNotification, updateNotification } from "../controller/notification.controller";
import { deleteFormData, getAllformData, submitFormData } from "../controller/form.contoller";

const formDataSubmit = express.Router();

formDataSubmit.post("/submit-form",submitFormData )
formDataSubmit.get("/get-formdata", getAllformData)

formDataSubmit.delete("/delete-formdata/:id", deleteFormData)

export default formDataSubmit;