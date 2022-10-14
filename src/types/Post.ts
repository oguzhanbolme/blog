import { DynamicContent } from './DynamicContent';

export type Post = {
  id: string;
  content: DynamicContent;
  creationDate: string;
  description: DynamicContent;
  tags: string[];
  title: DynamicContent;
};
