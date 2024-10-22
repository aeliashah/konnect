import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    Client = new Client();
    databases;
    bucket;
    constructor() {
        this.Client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteprojectid)
        this.databases = new Databases(this.Client)
        this.bucket = new Storage(this.Client)
    }

    async createPost({title, slug, content, featuredimg, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug,
                {
                    title,
                    content,
                    featuredimg,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, { title, content, featuredimg, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug,
                {
                    title,
                    content,
                    featuredimg,
                    status,
                }
            )
        }
        catch (error) {
            console.log("updatepost: ", error)
        }

    }

    async deletePost(slug) {
        try {
            return await this.databases.deleteDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug
            )
        }
        catch (error) {
            console.log("deletepost: ", error)
            return false
        }

    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug
            )
        }
        catch (error) {
            console.log("getpost: ", error)
            return false
        }

    }

    async getPosts() {
        try {
            return await this.databases.listDocuments(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                // [Query.equal("status", "active")]
            )
        } catch (error) {
            console.log("getposts: ", error)
            return false
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwritebucketid,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("upload file: ", error)
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwritebucketid,
                fileId
            )
        } catch (error) {
            console.log("deletefile: ", error)
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwritebucketid,
            fileId
        )
    }
}

const service = new Service()
export default service