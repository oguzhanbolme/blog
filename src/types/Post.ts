import { DynamicContent } from './DynamicContent';
import { Tag } from './Tag';

export type Post = {
  id: string;
  content: DynamicContent;
  creationDate: string;
  description: DynamicContent;
  tags: Tag[];
  title: DynamicContent;
};
