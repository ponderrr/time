import { Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface ListingLayoutProps {
  title: string;
  onAddClick: () => void;
  children: React.ReactNode;
}

export const ListingLayout = ({ title, onAddClick, children }: ListingLayoutProps) => {

  const getSingularForm = (word: string) => {
    if (word.endsWith('ies')) {
      return word.slice(0, -3) + 'y';  // Activities -> Activity
    }
    if (word.endsWith('s')) {
      return word.slice(0, -1);  // Products -> Product
    }
    return word;
  };

  return (
    <div className="w-full min-h-screen">
      <div className="w-full px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Button
            variant="light"
            color="brand"
            onClick={onAddClick}
            leftSection={<FontAwesomeIcon icon={faPlus} />}
            className="min-w-[150px] whitespace-nowrap overflow-visible"
            styles={{
              root: {
                minWidth: '160px', // Ensure minimum width via Mantine styles
                whiteSpace: 'nowrap',
                overflow: 'visible'
              },
              label: {
                whiteSpace: 'nowrap',
                overflow: 'visible'
              }
            }}
          >
            New {getSingularForm(title)}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 w-full">
          {children}
        </div>
      </div>
    </div>
  );
};