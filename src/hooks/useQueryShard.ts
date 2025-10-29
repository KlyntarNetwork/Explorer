import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryParams } from './useQueryParams';

interface ComboboxItemProps {
  label: string,
  value: string
}

export function useQueryShard(shardsList: ComboboxItemProps[]) {
  const { replace } = useRouter();
  const {
    shard: initialShard,
    searchParams,
    pathname
  } = useQueryParams();

  const [query, setQuery] = useState<ComboboxItemProps | undefined>(shardsList[0]);

  const setQueryParameters = useCallback(
    (shard: string, shardWasFound: boolean) => {
      const params = new URLSearchParams(searchParams);
      params.set('shard', shard);

      if (!shardWasFound) {
        params.set('page', String(1));
      }

      replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, replace, searchParams],
  );

  useEffect(() => {
    if (!shardsList.length) {
      setQuery(undefined);
      return;
    }

    const shardById = shardsList.find(i => i.label === initialShard);

    const shard = shardById ? shardById : shardsList[0];

    setQuery(shard);

    if (shard) {
      setQueryParameters(shard.label, !!shardById);
    }
  }, [initialShard, setQueryParameters, shardsList]);

  const handleQueryChange = (_: any, newValue: ComboboxItemProps) => {
    if (newValue && newValue.label) {
      setQueryParameters(newValue.label, true);
    } else {
      setQuery(undefined);
    }
  }

  return {
    shard: query,
    handleShardChange: handleQueryChange
  }
}