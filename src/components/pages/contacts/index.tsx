import { Button, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import SearchBar from "../../common/search-bar";
import ContactsService, { Contact } from "../../../services/contacts-service";
import ModalDialog from "../../common/modal-dialog";
import ContactForm, { defaultContact } from "./contact-form";
import "./contacts.scss"
import { delContact, doMessage, resetContacts } from "../../../redux/store";

type Props = {
};



const Contacts: React.FC<Props> = () => {


  const [searchString, setSearchString] = useState<string>("");
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
      renderCell: (data: any) => {
        return <div className="flex row">
          <Button size="small" onClick={() => setEditElement(data.row)}>Edit</Button>
          <Button size="small" onClick={() => deleteContact(data.row.phone)}>Delete</Button>
        </div>
      }
    }
  ]

  const deleteContact = async (phone: string) => {
    console.debug("deleteContact called with", phone);
      try{
        // attempt to delete
        await ContactsService.deleteContact(phone);

        doMessage("Contact deleted", "success")
        //reload data
        fetchData();
      }  catch(e:any){
        console.error(e);
        // doMessage(e.message || "Unknown error")
      }


  }

  const fetchData = async() => {
    try{

      const list = await ContactsService.getContacts();
      setContacts(list);

    } catch( e : any){
      doMessage(e.message || "Unknown error while fetching data")
    }
  }


  useEffect( () => {
    console.debug("default useEffect called");
    fetchData();
  },[])

  useEffect( () => {
    console.debug("useEffect for contacts/seaerch change called");
    doSearch(searchString)
  },[contacts, searchString])

  const doSearch =  (search: string ) => {

    console.debug("doSearch called with", search);
    // filter contacts with search string
    
    
    // add id for DataGrid to eat the data (it needs the id field)
    const contactsWithId = contacts.map( c => ({...c, id: c.phone}) )


    // if empty search string - set the whole list
    if( !search ) {
      console.debug("search is empty, setting filtered contacts to", contactsWithId);
      setFilteredContacts(contactsWithId);
      return;
    }

    console.debug("doSearch contacts are:", contacts);
    setFilteredContacts(
      contactsWithId.filter( c => {
          // filtering conditions
          return  c.phone.toLowerCase().includes(search) ||
                  c.fullName.toLowerCase().includes(search) ||
                  c.age.toString().includes(search) ||
                  c.email.toLowerCase().includes(search) ||
                  c.notes.join("").toLowerCase().includes(search)

        }
      ) 
    );
  }

  const saveContact = async (c: Contact ) => {
    console.debug("saveContact cxalled with", c);
    try {
      await ContactsService.saveContact( c );
      
      // reload data from service
      fetchData();

      // reset form
      setEditElement(null);

    }catch(e : any ){
      doMessage(e?.message || "Unknown error", "error");
    }
  }

  return <div className="page contacts">
    <Typography variant="h1" color="primary">Contacts</Typography >
    <SearchBar onSearch={(search: string) => setSearchString(search)} />

    <div className="buttons flex space-between">
      <Button variant="contained" onClick={()=> setEditElement(defaultContact)}>Add</Button>
      <Button variant="contained" color="secondary" onClick={async ()=>{
        await ContactsService.resetContacts();
        fetchData();
      } }>Reset to default data</Button>
    </div>

    <DataGrid
      autoHeight
      columns={columns}
      // rows={contacts.map( c => ({...c, id: c.phone})) }
      rows={ filteredContacts }
      initialState={
        {
          pagination: {
            paginationModel: {pageSize: 10, page: 0}
          }
        }
      }
      sx={{
        fontFamily: "'Lato', sans-serif"
      }}
    />
    <ModalDialog open={editElement !== null } header={editElement?.phone  ? "Edit contact" : "Add contact"} onClose={()=>setEditElement(null)}>
      <ContactForm contact={editElement} onSave={saveContact} />
    </ModalDialog>
  </div>};

export default Contacts;
