import { useRouter } from 'next/router';
import useSearch from '../../../../hooks/useSearch';
import { Tag } from '../../../../types/Tag';

export default function TagList({ tags }: { tags: Tag[] }) {
  const { locale } = useRouter();
  const search = useSearch();

  return (
    <div className="flex flex-wrap gap-4">
      {tags.map((tag: Tag) => (
        <button
          key={tag.id}
          type="button"
          className={`${search.selectedTags[tag.id as keyof {}] ? 'bg-purple-400' : 'bg-indigo-100'} text-indigo-800 text-lg font-semibold px-2.5 py-0.5 rounded dark:${search.selectedTags[tag.id as keyof {}] ? 'bg-purple-400' : 'bg-indigo-200'} dark:text-indigo-900`}
          onClick={() => {
            const selectedTags = { ...search.selectedTags };

            if (selectedTags[tag.id as keyof {}]) {
              delete selectedTags[tag.id as keyof {}];
              search.setSelectedTags(selectedTags);
            } else {
              (selectedTags as Record<typeof tag.id, typeof tag.id>)[tag.id] = tag.id;
              search.setSelectedTags(selectedTags);
            }
          }}
        >
          {tag.name[locale as keyof typeof tag.name] || tag.name.default}
          {' '}
          <span className="text-white px-1 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500">
            {tag.members.length}
          </span>
        </button>
      ))}
    </div>
  );
}
