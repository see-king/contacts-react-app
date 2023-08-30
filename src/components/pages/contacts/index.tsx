import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import SearchBar from "../../common/search-bar";
import ContactsService, { Contact } from "../../../services/contacts-service";

type Props = {
};

const columns : any[] = [
  {
    field: "fullName",
    flex: 1
  },
  {
    field: "email",
    flex: 1
  },
  {
    field: "age",
    flex: 1
  }
]

const Contacts: React.FC<Props> = () => {


  let [contacts, setContacts] = useState<Contact[]>([]);
  let [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);


  useEffect( () => {
    console.debug("useEffect called");
    const fetchData = async() => {
      try{

        const list = await ContactsService.getContacts();
        setContacts(list);
      } catch( e ){

      }
    }

    fetchData();
  

  })

  const doSearch =  (search: string ) => {

  }



  return <div className="page contacts">
    <Typography variant="h1">Contacts</Typography>
    <SearchBar onSearch={doSearch} />
    <DataGrid
      autoHeight
      columns={columns}
      rows={filteredContacts}
    />
  
  </div>;
};

export default Contacts;
