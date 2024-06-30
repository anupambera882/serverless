import { TodoTypes } from "./interface";

export const columns: { header: string; key: keyof TodoTypes }[] = [
  { header: 'ID', key: 'id' },
  { header: 'Title', key: 'title' },
  { header: 'Content', key: 'content' },
  { header: 'Is Done', key: 'isDone' },
  { header: 'Created At', key: 'createdAt' },
  { header: 'Updated At', key: 'updateAt' },
  { header: 'Created By', key: 'createdBy' },
];