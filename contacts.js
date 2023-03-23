const fs = require("fs").promises;
const path = require("path");

const { nanoid } = require("nanoid");

console.log("dirname", __dirname);

const contactsPath = path.resolve("db", "contacts.json");
console.log("conctatPath", contactsPath);

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    console.table(data);
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const contacts = listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return newBook;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
