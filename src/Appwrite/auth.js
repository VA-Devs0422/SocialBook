import { Client, Account, ID } from "appwrite";
import conf from "./conf";


class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)

        this.account = new Account(this.client)
    }

    async createAccount({Fullname,password,email,UserName}) {

        try {
            const userAccount = await this.account.create(ID.unique(),email, password, Fullname,UserName);

            if (userAccount) {
                //Calling login method
                console.log('Account Created', userAccount);
                return this.login({email,password})
            }

            else {
                console.log('Account creattion failed')
                return userAccount;
            }
        } catch (error) {
            console.error(error)

            throw (error)
        }



    }

    async login({email,password})
    {
        console.log('Entered login block');
        try {
            console.log('login Successful')
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            console.error('failed to login',error)
            throw(error)
        }
    }

    async getCurrentUser(){
    try {
        return await this.account.get()
    } catch (error) {
        console.log('Appwrite error::',error)
    }
}


        async logout(){
            try {
                return await this.account.deleteSessions();
            } catch (error) {
                
                    console.log('Appwrite Error:: Logout :',error)
                
            }
        }

}



const authService = new AuthService()

export default authService;
