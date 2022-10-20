import type { NextApiRequest, NextApiResponse } from 'next';
import firestore from '../../../services/firestore';
import { Post } from '../../../types/Post';
import { Tag } from '../../../types/Tag';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>,
) {
  try {
    let posts;
    const fields = req.query.fields as string;
    const result: Post[] = [];

    const tags: Tag[] = await (await fetch(`${process.env.DOMAIN_URL}/api/tags`)).json();

    if (fields) {
      const fieldArray = fields.split(',');
      posts = await firestore.collection('posts').orderBy('creationDate', 'desc').select(...fieldArray).get();
    } else {
      posts = await firestore.collection('posts').orderBy('creationDate', 'desc').get();
    }

    posts.forEach((post) => {
      const data = post.data() as Post;
      const matchedTags: Tag[] = [];

      for (let i = 0; i < data.tags.length; i += 1) {
        const matchedTag = tags.find((tag) => tag.id === (data.tags[i] as unknown as string));
        if (matchedTag) matchedTags.push(matchedTag);
      }

      result.push({ ...data, tags: matchedTags, id: post.id });
    });

    res.status(200).send(result);
  } catch {
    res.status(500).send([]);
  }
}
