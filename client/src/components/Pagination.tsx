import { Pagination as MantinePagination, Group, Text, Select } from '@mantine/core';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
  showPageSizeSelector = true
}: PaginationProps) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Group justify="space-between" align="center" mt="md">
      <Text size="sm" c="dimmed">
        Showing {startItem}-{endItem} of {totalItems} items
      </Text>
      
      <Group gap="md" align="center">
        {showPageSizeSelector && (
          <Group gap="xs" align="center">
            <Text size="sm">Show:</Text>
            <Select
              value={pageSize.toString()}
              onChange={(value) => onPageSizeChange(parseInt(value || '10'))}
              data={pageSizeOptions.map(size => ({ value: size.toString(), label: size.toString() }))}
              size="sm"
              w={80}
            />
          </Group>
        )}
        
        <MantinePagination
          value={currentPage}
          onChange={onPageChange}
          total={totalPages}
          size="sm"
          withEdges
        />
      </Group>
    </Group>
  );
};
