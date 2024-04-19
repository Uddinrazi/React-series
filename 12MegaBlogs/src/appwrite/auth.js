import config from "../conf/config";
import { Client, Account, ID } from 'appwrite';

export class AuthService{
    client = new Client();

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }){
    try {
        const userAccount = await this.account.create(ID.unique(), email, password, name)
        if (userAccount)
            //call another method
            return this.login({email, password})
        else
            return userAccount
    } catch (err) {
        throw err;
    }
    }
    
    async login({ email, password }) {
        try {
          return  await this.account.createEmailPasswordSession(email, password)
        } catch (err) {
            throw err;
        }
    }

    async getCurrentUser()  {
    try {
       return await this.account.get()
    } catch (err) {
        console.log("getCurrentUserError" ,err)
        }
        return null;
    }


    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (err) {
            console.log("logout error", err)
        }
    }
}

    
const authService = new AuthService();

export default authService;