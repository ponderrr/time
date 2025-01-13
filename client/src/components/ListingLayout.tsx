import { Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface ListingLayoutProps {
  title: string;
  onAddClick: () => void;
  children: React.ReactNode;
}

export const ListingLayout = ({ title, onAddClick, children }: ListingLayoutProps) => {
  return (
    <div className="px-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-8 w-full">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Button
          variant="light"
          color="brand"
          onClick={onAddClick}
          leftSection={<FontAwesomeIcon icon={faPlus} />}
          className="focus:outline-none"
        >
          New {title.slice(0, -1)}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center w-full max-w-[1200px] mx-auto">
        {children}
      </div>
    </div>
  );
};