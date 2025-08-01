import { Client, ID, Databases, Storage } from "appwrite";
import conf from "./conf";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createProfile({profile_picture,bio,user_name,userId})
    {
            try {
                    return await this.databases.createDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteUserCollectionId,
                        userId,
                        {
                            profile_picture,
                            bio,
                            user_name
                        }
                    )

                
            } catch (error) {
                console.log('profile creation failed',error)
            }
    }

    async uploadPic(file)
    {
        try {
                    return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file)
        } catch (error) {
                console.error('File creation error',error)
        }
    }
}