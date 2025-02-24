"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const form_contoller_1 = require("../controller/form.contoller");
const formDataSubmit = express_1.default.Router();
formDataSubmit.post("/submit-form", form_contoller_1.submitFormData);
formDataSubmit.get("/get-formdata", form_contoller_1.getAllformData);
formDataSubmit.delete("/delete-formdata/:id", form_contoller_1.deleteFormData);
exports.default = formDataSubmit;
