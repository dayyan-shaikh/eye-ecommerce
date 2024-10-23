import mongoose, { model, Schema, models } from "mongoose";

const ContactsSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

export const Contacts = models.Contacts || model("Contacts", ContactsSchema);
