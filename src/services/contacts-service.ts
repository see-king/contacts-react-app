import { contactsActions } from "../redux/contact-reducer";
import store, { delContact, getAllContacts, resetContacts, updContact } from "../redux/store";

export interface Contact {
    phone: string,
    email: string,
    fullName: string,
    age: number,
    notes: string[]
}



// const defaultContacts : Contact[] = [
//     {
//         phone: "12345667",
//         fullName: "John Doe",
//         email: "test1@test.cc",
//         age: 46,
//         notes: []
//     },
//     {
//         phone: "123456674",
//         fullName: "Jane Doe",
//         email: "test2@test.cc",
//         age: 34,
//         notes: []
//     }
// ];

// const localStorageData : any =  JSON.parse( localStorage.getItem(localStorageIndex) );

// let contacts : Contact[];

class ContactsService {



    static async getContacts() {
        console.debug("getContants called")
        return getAllContacts();
    }

    static async saveContact( contact : Contact ){
        console.debug("saving contact", contact);

        // update in redux
        updContact(contact);
        return true;
    }

    static async deleteContact( phone: string){
        // delete in redux
        delContact(phone);

        return true;
    }


    static async resetContacts(){
        // reset in redux
        resetContacts();
    }
    
}


export default ContactsService;