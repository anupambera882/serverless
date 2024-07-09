import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface InputAreaType {
  label: string,
  placeholder: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string,
  required?: boolean,
}

export interface Response<ResponseType = object | object[]> {
  statusCode: number;
  response: ResponseType;
  message: string;
}

export interface PaginationResponse<Response> {
  data: Response[];
  metaData: {
    pageNumber: number;
    limitCount: number;
    total: number;
  };
}

export interface Auth {
  email: string;
  roles: string[];
  accessToken: string;
}

export interface AuthContextType {
  auth: Auth;
  setAuth: Dispatch<SetStateAction<Auth>>;
}

export interface TodoTypes {
  id: number;
  title: string;
  content: string;
  isDone: boolean;
  createdAt: Date;
  updateAt: Date;
  createdBy: number;
}

export interface Column {
  header: string;
  key: keyof TodoTypes;
}

export interface DataTableProps {
  columns: Column[];
  data: TodoTypes[];
}

export interface SubmitButtonType {
  label: string,
  type?: "submit"|"reset" | "button",
}