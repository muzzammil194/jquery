import { HttpException, HttpStatus } from "@nestjs/common";
import { GenericResponse } from "./responses";


export function GenericSuccessResponse<T>(data : T) : GenericResponse<T> {
  return {
    success: true,
    error: "",
    data: data
  };
}

export function GenericErrorResponse(error : string, message: string = null) : GenericResponse<any> {
  return {
    success: false,
    error: error,
    data: message??{}
  };
}

export function CreateErrorResponse(e){
  throw new HttpException(GenericErrorResponse(e.message), HttpStatus.INTERNAL_SERVER_ERROR);
}