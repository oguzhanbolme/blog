import type { NextApiRequest, NextApiResponse } from 'next';
import firestore from '../../../services/firestore';
import { Post } from '../../../types/Post';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post>,
) {
  try {
    const id = req.query.id as string;
    const post = await firestore.collection('posts').doc(id).get();
    const result = { ...post.data(), id } as Post;

    res.status(200).send(result);
  } catch {
    res.status(500).send({} as Post);
  }
}
