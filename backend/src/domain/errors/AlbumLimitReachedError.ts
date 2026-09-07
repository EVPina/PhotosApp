export class AlbumLimitReachedError extends Error {
 constructor(message:string) {
     super(message);
     this.name = "Limite de albumes alcanzado";
   }    
}
