import { TextInput, ActionIcon } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  debounceMs?: number;
  initialValue?: string;
}

export const SearchInput = ({
  onSearch,
  placeholder = "Search...",
  debounceMs = 300,
  initialValue = ""
}: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch, debounceMs]);

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <TextInput
      placeholder={placeholder}
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.currentTarget.value)}
      leftSection={<IconSearch size={16} />}
      rightSection={
        searchTerm && (
          <ActionIcon
            variant="subtle"
            color="gray"
            onClick={handleClear}
            size="sm"
          >
            <IconX size={14} />
          </ActionIcon>
        )
      }
      size="md"
      w="100%"
      maxWidth={400}
    />
  );
};
