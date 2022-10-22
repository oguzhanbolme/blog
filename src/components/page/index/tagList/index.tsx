import useSearch from '../../../../hooks/useSearch';
import { Tag } from '../../../../types/Tag';
import TagButton from '../../../ui/TagButton';

export default function TagList({ tags }: { tags: Tag[] }) {
  const search = useSearch();

  return (
    <div className="flex flex-wrap gap-4">
      {tags.map((tag: Tag) => (
        <TagButton
          key={tag.id}
          tag={tag}
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
          isSelected={search.selectedTags[tag.id as keyof {}]}
        />
      ))}
    </div>
  );
}
