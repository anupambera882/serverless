import { ChangeEvent } from "react";

export interface LabelledInputType {
  label: string,
  placeholder: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string,
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

export interface TodoTypes {
  id: number;
  title: string;
  content: string;
  isDone: boolean;
  createdAt: Date;
  updateAt: Date;
  createdBy: number;
}

interface Column {
  header: string;
  key: keyof TodoTypes;
}

export interface DataTableProps {
  columns: Column[];
  data: TodoTypes[];
}
