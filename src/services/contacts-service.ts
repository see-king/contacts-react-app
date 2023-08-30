export interface Contact {
    phone: string,
    email: string,
    fullName: string,
    age: number,
    notes: string[]
}


class ContactsService {



    static async getContacts() {
        console.debug("getContants called")
        return [
            {
                phone: "12345667",
                fullName: "John Doe",
                email: "test1@test.cc",
                age: 46,
                notes: []
            },
            {
                phone: "12345667",
                fullName: "Jane Doe",
                email: "test2@test.cc",
                age: 34,
                notes: []
            }
        ];
    }

    static async addContact( contact : Contact ){
        return true;
    }
}

export default ContactsService;