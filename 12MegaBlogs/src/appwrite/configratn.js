import config from "../conf/config";
import { Client, ID, Databases, Storage, Query, Client } from 'appwrite';

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCOllectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (err) {
      console.log("Createpost err :", err);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    try {
      return this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCOllectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (err) {
      console.log("updatePost status", err);
    }
  }

    async deletePost(slug) {
        try {
          await this.databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCOllectionId,
            slug
          
            );
            
            return true;
        } catch (err) {
            console.log("deletePost err", err)
            return false;
      }
    }
    
    async getPost(slug) {
        try {
            await this.databases.getDocument(config.appwriteDatabaseId, config.appwriteCOllectionId,slug)
        } catch (err) {
            console.log("getPost error:", err)
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,config.appwriteCOllectionId,queries
            )
        }
        catch (err) {
            console.log("getPosts error: ", err)
            return false;
        }
    }

    //file upload
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(config.appwriteBucketId, ID.unique(),
            file)
        } catch (err) {
            console.log("uploadFile error:" , err)
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(config.appwriteBucketId, fileId)
            return true;

        } catch (err) {
            console.log("deleteFile error:", err)
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(config.appwriteBucketId,fileId)
    }
}

const service = new Service()

export default service;
