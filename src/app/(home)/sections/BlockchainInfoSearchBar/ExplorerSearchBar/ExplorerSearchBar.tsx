'use client';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SelectChangeEvent, } from '@mui/material';
import { FlexBetweenBox, GeometricButton } from '@/components/ui';
import { FilterDropdown } from './FilterDropdown';
import { SearchInput } from './SearchInput';
import { logUserAction } from '@/helpers';
import { USER_ACTIONS } from '@/constants';
import { SEARCH_OPTIONS, SEARCH_OPTIONS_URL, SEARCH_OPTIONS_PLACEHOLDER } from './constants';
import { BG_COLORS } from '@/styles';
import SearchIcon from '@public/icons/ui/search.svg';

export const ExplorerSearchBar = () => {
  const { push } = useRouter();
  const [searchType, setSearchType] = useState(SEARCH_OPTIONS.CHOOSE);
  const [query, setQuery] = useState('');

  const isChoose = searchType === SEARCH_OPTIONS.CHOOSE;

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchTypeChange = (event: SelectChangeEvent) => {
    setSearchType(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (isChoose || !query) {
      return false;
    }
    logUserAction(USER_ACTIONS.SEARCH_VIA_MAIN_BAR, { value: searchType })
    push(`${SEARCH_OPTIONS_URL[searchType]}/${query.trim()}`);
  };

  return (
    <FlexBetweenBox
      border={1}
      borderColor='border.main'
      sx={{
        gap: 2,
        px: 0.4,
        background: BG_COLORS.GRAY_LIGHT,
        position: 'relative'
      }}
    >
      <FilterDropdown
        searchType={searchType}
        handleSearchTypeChange={handleSearchTypeChange}
      />
      <SearchInput
        placeholder={SEARCH_OPTIONS_PLACEHOLDER[searchType]}
        isChoose={isChoose}
        query={query}
        handleQueryChange={handleQueryChange}
        handleKeyDown={handleKeyDown}
      />
      <GeometricButton
        variant='cyan'
        disableShadow={true}
        onClick={handleSubmit}
        sx={{ py: 0.75 }}
      >
        <SearchIcon />
      </GeometricButton>
    </FlexBetweenBox>
  );
}

