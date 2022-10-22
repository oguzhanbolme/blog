import type { NextApiRequest, NextApiResponse } from 'next';
import firestore from '../../../services/firestore';
import { Post } from '../../../types/Post';
import { Tag } from '../../../types/Tag';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post>,
) {
  try {
    const id = req.query.id as string;
    const post = await firestore.collection('posts').doc(id).get();
    let result = { ...post.data(), id } as Post;

    const tags: Tag[] = await (await fetch(`${process.env.DOMAIN_URL}/api/tags`)).json();

    const data = post.data() as Post;
    const matchedTags: Tag[] = [];

    for (let i = 0; i < data.tags.length; i += 1) {
      const matchedTag = tags.find((tag) => tag.id === (data.tags[i] as unknown as string));
      if (matchedTag) matchedTags.push(matchedTag);
    }

    result = { ...result, tags: matchedTags };

    res.status(200).send(result);
  } catch {
    res.status(500).send({} as Post);
  }
}
