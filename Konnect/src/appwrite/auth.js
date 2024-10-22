import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    Client = new Client();
    account;

    constructor() {
        this.Client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteprojectid);
        this.account = new Account(this.Client);
    }
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            let userData2 = null;
            if (userAccount) {
                userData2=this.login({ email, password })
                return userData2
            } else {
                return userAccount
            }
        } catch (error) {
         console.log("createAccount: ",error)
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("login: ",error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
           console.log("getCurrentUser: ",error)
        }
        return null;

    }


    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
           console.log("logout: ",error)
        }
    }



}
const authService = new AuthService();
export default authService