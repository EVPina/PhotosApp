export class PhotoLimitReachedError extends Error {
    constructor(message:string) {
        super(message);
        this.name = "Limite de fotos alcanzado";
    }
}
