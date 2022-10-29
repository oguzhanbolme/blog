import { Tag } from './Tag';

export type Post = {
  id: string;
  content: string;
  creationDate: string;
  description: string;
  tags: Tag[];
  title: string;
};
