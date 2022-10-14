import type { NextApiRequest, NextApiResponse } from 'next';
import firestore from '../../../services/firestore';
import { Tag } from '../../../types/Tag';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Tag[]>,
) {
  try {
    const result: Tag[] = [];
    const tags = await firestore.collection('tags').get();

    tags.forEach((tag) => {
      const data = tag.data() as Tag;
      result.push({ ...data, id: tag.id });
    });

    res.status(200).send(result);
  } catch {
    res.status(500).send([]);
  }
}
