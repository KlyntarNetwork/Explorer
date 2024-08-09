'use client';
import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Autocomplete, AutocompleteValue, TextField } from '@mui/material';
import { useQueryParams } from '@/hooks';
import { FlexBetweenBox, GeometricButton } from '@/components/ui';
import SearchIcon from '@public/icons/ui/search.svg';

type ComboboxItemProps = {
  label: string,
  value: string
}

export const ShardSearchBar: FC<{ shardsList: ComboboxItemProps[]}> = ({
  shardsList
}) => {
  const { replace } = useRouter();
  const {
    shard: initialShard,
    searchParams,
    pathname
  } = useQueryParams();

  const [query, setQuery] = useState<ComboboxItemProps|null>(shardsList[0]);

  useEffect(() => {
    const shardById = shardsList.find(i => i.label === initialShard);

    setQuery(shardById ? shardById : shardsList[0]);

    if (!shardById) {
      setShardParameter(shardsList[0].label);
    }
  }, [initialShard]);

  const handleQueryChange = (_: any, newValue: ComboboxItemProps) => {
    if (newValue && newValue.label) {
      setShardParameter(newValue.label);
    } else {
      setQuery(null);
    }
  }

  const setShardParameter = (shard: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('shard', shard);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const isOptionEqualToValue = (option: ComboboxItemProps, value: ComboboxItemProps | null) => {
    return value ? option.value === value.value : false;
  };

  return (
    <FlexBetweenBox
      border={1}
      borderColor='border.main'
      sx={{
        gap: 2,
        pl: 1.5,
        pr: 0.4,
        background: 'rgba(17, 17, 17, 0.6)'
      }}
    >
      <Autocomplete
        disablePortal
        options={shardsList}
        value={query}
        onChange={handleQueryChange as AutocompleteValue<any, any, any, any>}
        isOptionEqualToValue={isOptionEqualToValue}
        sx={{ flex: 1 }}
        renderInput={(params) => (
          <TextField {...params} />
        )}
      />
      <GeometricButton
        variant='cyan'
        disableShadow={true}
        sx={{ py: 0.75, cursor: 'default' }}
      >
        <SearchIcon />
      </GeometricButton>
    </FlexBetweenBox>
  );
}
