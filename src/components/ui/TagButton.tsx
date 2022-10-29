import { Tag } from '../../types/Tag';

export default function TagButton({ tag, onClick, isSelected }: { tag: Tag, onClick?: () => void, isSelected?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`${onClick ? 'cursor-pointer' : ''} ${isSelected ? 'bg-purple-400' : 'bg-indigo-100'} text-indigo-800 text-base md:text-lg font-semibold px-2.5 py-0.5 rounded dark:${isSelected ? 'bg-purple-400' : 'bg-indigo-200'} dark:text-indigo-900`}
      onClick={onClick}
    >
      {tag.name}

      {onClick && (
        <>
          {' '}
          <span className="text-white px-1 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500">
            {tag.members.length}
          </span>
        </>
      )}
    </span>
  );
}

TagButton.defaultProps = {
  onClick: null,
  isSelected: false,
};
