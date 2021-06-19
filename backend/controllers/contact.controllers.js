import asyncHandler from 'express-async-handler'
import Contact from '../models/contact.models.js'

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phoneNo1, phoneNo2, address, selectedImage } = req.body

  const newContact = new Contact({
    name,
    email,
    phoneNo1,
    phoneNo2,
    address,
    selectedImage,
  })

  try {
    await newContact.save()
    res.status(201).json(newContact)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
})

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find()
  res.json(contacts)
})

export { createContact, getContacts }