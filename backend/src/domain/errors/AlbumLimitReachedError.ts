export class AlbumLimitReachedError extends Error {
 constructor(message:string| undefined = "Limite de albumes alcanzado") {
     super(message);
     this.name = "Limite de albumes alcanzado";
   }    
}
