import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Contact } from "../../../services/contacts-service";

type ContactFormProps = {
  contact: null | Contact,
  onSave: (c: Contact) => void
};

export const defaultContact: Contact = {
  phone: "",
  fullName:"",
  email: "",

  age: 0,
  notes: []

}

const ContactForm: React.FC<ContactFormProps> = ({contact, onSave}) => {
  const [formContact, setContact] = useState<Contact>( contact || defaultContact) 
  
  useEffect( () => {
    setContact(contact!)
  }, [contact])

  const onChange = (ev: any) => {
    const {target} = ev;

    setContact( {...formContact, [target.name] : target.value })
  }

  const updateNotes = (ev: any ) => {

  }

  const save = () => {
    onSave(formContact);
  }

  // fall back for
  if( !contact ) return <>...</>;

  return <div className="contact-form">
    <TextField name="fullName" label="Full name" onInput={onChange} value={formContact.fullName}/>
    <TextField name="phone" label="Phone" onInput={onChange} value={formContact.phone}/>
    <TextField name="email" label="Email" onInput={onChange} value={formContact.email}/>
    <TextField name="age" type="number" inputProps={{ min: 1}} label="Age" onInput={onChange} value={formContact.age}/>

    {/* <TextField type="textarea" name="notes" value={formContact.notes.join("\n")} onInput={updateNotes} /> */}
    <TextField type="textarea" name="notes" value={""} onInput={updateNotes} />


    <Button onClick={save} variant="contained">Save</Button>
  </div>;
};

export default ContactForm;
