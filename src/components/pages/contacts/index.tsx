import { Button, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import SearchBar from "../../common/search-bar";
import ContactsService, { Contact } from "../../../services/contacts-service";
import ModalDialog from "../../common/modal-dialog";
import ContactForm, { defaultContact } from "./contact-form";

type Props = {
};



const Contacts: React.FC<Props> = () => {


  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [ editElement, setEditElement ] = useState<Contact | null >(null);

  const columns : any[] = [
    {
      field: "fullName",
      flex: 1,
      headerName: "Full Name"
    },
    {
      field: "email",
      flex: 1,
      headerName: "Email"
    },
    {
      field: "age",
      flex: 1,
      headerName: "Age"
    },
    {
      field: "actions",
      flex: 1,
      headerName: "",
      renderCell: (row : any) => {
        return <div className="flex row">
          <Button size="small" onClick={() => setEditElement(row)}>Edit</Button>
          <Button size="small">Delete</Button>
        </div>
      }
    }
  ]

  const fetchData = async() => {
    try{

      const list = await ContactsService.getContacts();
      setContacts(list);
      doSearch("");
    } catch( e ){

    }
  }


  useEffect( () => {
    console.debug("useEffect called");
    

    fetchData();
  

  },[])

  const doSearch =  (search: string ) => {
    // TODO: filter contacts with search string

    console.debug("doSearch contacts are:", contacts);
    setFilteredContacts(contacts.map( c => ({...c, id: c.phone}) ));
  }

  const saveContact = async (c: Contact ) => {
    try {
      await ContactsService.saveContact( c);
      fetchData();
      setEditElement(null);
    }catch(e){

    }
  }

  return <div className="page contacts">
    <Typography variant="h1" color="primary">Contacts</Typography >
    <SearchBar onSearch={doSearch} />
    <Button variant="contained" onClick={()=> setEditElement(defaultContact)}>Add</Button>
    <DataGrid
      autoHeight
      columns={columns}
      rows={contacts.map( c => ({...c, id: c.phone})) }
      sx={{
        fontFamily: "'Lato', sans-serif"
      }}
    />
    <ModalDialog open={editElement !== null } header={editElement?.phone  ? "Edit contact" : "Add contact"} onClose={()=>setEditElement(null)}>
      <ContactForm contact={editElement} onSave={saveContact} />
    </ModalDialog>
  </div>};

export default Contacts;
