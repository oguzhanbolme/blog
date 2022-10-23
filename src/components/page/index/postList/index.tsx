import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Fuse from 'fuse.js';
import { Post } from '../../../../types/Post';
import { Tag } from '../../../../types/Tag';
import useSearch from '../../../../hooks/useSearch';
import convertDateToString from '../../../../utils/convertDateToString';
import TagButton from '../../../ui/TagButton';

export default function PostList({ posts }: { posts: Post[] }) {
  const { locale, push } = useRouter();
  const search = useSearch();
  const filteredPosts = useMemo(() => {
    let result = posts;

    if (Object.keys(search.selectedTags).length > 0) {
      result = posts.filter((post) => post.tags.find((tag) => tag.id === search.selectedTags[tag.id as keyof {}]));
    }
    if (search.text !== '') {
      const fuse = new Fuse(result, { threshold: 0.25, keys: [`title.${locale}`, `description.${locale}`] });
      return fuse.search(search.text).map((post) => post.item);
    }

    return result;
  }, [posts, search, locale]);

  return (
    <div className="flex flex-col gap-6">
      {filteredPosts.map((post: Post) => (
        <article
          key={post.id}
          aria-hidden="true"
          onClick={() => push(`/posts/${post.id}`)}
          className="cursor-pointer block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {post.title[locale as keyof typeof post.title] || post.title.default}
          </h5>

          <p className="font-normal text-gray-700 dark:text-gray-400 mb-1">
            {convertDateToString(post.creationDate)}
          </p>

          <div className="flex flex-wrap gap-4 mb-4">
            {post.tags.map((tag: Tag) => (
              <TagButton key={tag.id} tag={tag} />
            ))}
          </div>

          <p className="font-normal">
            {post.description[locale as keyof typeof post.description] || post.title.default}
          </p>
        </article>
      ))}
    </div>
  );
}
