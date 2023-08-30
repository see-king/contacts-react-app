export interface Contact {
    phone: string,
    email: string,
    fullName: string,
    age: number,
    notes: string[]
}


let contacts : Contact[] =  [
    {
        phone: "12345667",
        fullName: "John Doe",
        email: "test1@test.cc",
        age: 46,
        notes: []
    },
    {
        phone: "123456674",
        fullName: "Jane Doe",
        email: "test2@test.cc",
        age: 34,
        notes: []
    }
];

class ContactsService {



    static async getContacts() {
        console.debug("getContants called, they are", contacts)
        return contacts;
    }

    static async saveContact( contact : Contact ){
        const {phone} = contact;

        // find if exists
        const index = contacts.findIndex( c => c.phone === phone );
        if( index >=0 ){
            contacts[index]= contact;
            return true;
        }

        // does not exist
        contacts.push(contact);
        return true;
    }
}

export default ContactsService;