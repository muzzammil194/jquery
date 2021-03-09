export class GenericResponse<D>{
    public success:boolean;
    public error:string;
    public data: D;
}