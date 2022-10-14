import type { NextApiRequest, NextApiResponse } from 'next';
import firestore from '../../../services/firestore';
import { Post } from '../../../types/Post';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>,
) {
  try {
    let posts;
    const fields = req.query.fields as string;
    const result: Post[] = [];

    if (fields) {
      const fieldArray = fields.split(',');
      posts = await firestore.collection('posts').orderBy('creationDate', 'desc').select(...fieldArray).get();
    } else {
      posts = await firestore.collection('posts').orderBy('creationDate', 'desc').get();
    }

    posts.forEach((post) => {
      const data = post.data() as Post;
      result.push({ ...data, id: post.id });
    });

    res.status(200).send(result);
  } catch {
    res.status(500).send([]);
  }
}
