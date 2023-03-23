const contacts = require("./contacts.js");

const { Command } = require("commander");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;

    case "get":
      const ContactByID = await contacts.getContactById(id);
      console.log(ContactByID);
      break;

    case "add":
      const newContact = await contacts.addContact( name, email, phone );
      console.log(newContact);
      break;

    case "remove":
      const contactToRemove = await contacts.removeContact(id);
      console.log(contactToRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
