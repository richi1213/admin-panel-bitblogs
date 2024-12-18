import { useEffect, useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import qs from 'qs';
import { useBlogContext } from '@/context/blogs/blog-context';
import { useDebounceValue } from 'usehooks-ts';
import { SearchInputProps } from '@/components/ui/search/types';

export const SearchInput: React.FC<SearchInputProps> = ({ className }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const parsedQueryParams = qs.parse(searchParams.toString());

  const { setSearchText } = useBlogContext();
  const [searchText, setSearchTextState] = useState(
    parsedQueryParams?.searchText || '',
  );

  useEffect(() => {
    if (parsedQueryParams?.searchText) {
      setSearchText(parsedQueryParams.searchText as string);
    }
  }, [parsedQueryParams, setSearchText]);

  const [debouncedSearchText] = useDebounceValue(searchText, 200);

  useEffect(() => {
    setSearchText((debouncedSearchText as string) ?? null);

    if (debouncedSearchText) {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set('searchText', debouncedSearchText as string);
        return newParams;
      });
    } else {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.delete('searchText');
        return newParams;
      });
    }
  }, [debouncedSearchText, setSearchText, setSearchParams]);

  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`relative ${className}`}>
      <Input
        type='search'
        value={searchText as string}
        onChange={(e) => setSearchTextState(e.target.value)}
        placeholder='Type to search'
        className={`h-9 w-[250px] pl-8 transition-all duration-300 focus-visible:ring-1 ${
          isExpanded ? 'max-sm:w-[160px]' : 'max-sm:w-9 max-sm:px-0 max-sm:pl-9'
        } bg-background text-foreground placeholder:text-muted-foreground border-input focus-visible:ring-ring text-sm ${className}`}
      />
      <SearchOutlined
        className={`text-muted-foreground absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer transition-all duration-300 ${
          isExpanded
            ? 'max-sm:left-2'
            : 'max-sm:left-1/2 max-sm:-translate-x-1/2'
        }`}
        onClick={handleSearchClick}
      />
    </div>
  );
};
