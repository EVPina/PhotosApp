import { NextFunction, Request, Response } from "express";
import { Application_CreateAlbum } from "../../application/albums/Application_CreateAlbum";
import { Application_DeleteAlbum } from "../../application/albums/Application_DeleteAlbum";
import { Application_GetUserAlbums } from "../../application/albums/Application_GetUserAlbums";
import { Application_UpdateAlbum } from "../../application/albums/Application_UpdateAlbum";

export class AlbumController {
    constructor(private application_CreateAlbum: Application_CreateAlbum,private application_GetUserAlbums: Application_GetUserAlbums,private application_UpdateAlbum: Application_UpdateAlbum, private application_DeleteAlbum: Application_DeleteAlbum) {
    }
    
    async createAlbum(req: Request, res: Response,next:NextFunction) : Promise<void>{
        try{
            const { userId, title, description } = req.body;
            const album = await this.application_CreateAlbum.execute(userId, title, description);
            res.status(201).json(album);
        }catch(error){
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.userId!;
            const albums = await this.application_GetUserAlbums.execute(userId);
            res.json(albums);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const albumId = req.params.id as string;
            const userId = req.userId!;
            const changes = req.body;
            const album = await this.application_UpdateAlbum.execute(albumId, userId, changes);
            res.json(album);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const albumId = req.params.id  as string;
            const userId = req.userId!;
            await this.application_DeleteAlbum.execute(albumId, userId);
            res.json({ message: 'Album deleted' });
        } catch (error) {
            next(error);
        }
    }
}