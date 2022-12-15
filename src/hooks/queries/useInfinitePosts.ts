import type { QueryFunctionContext } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRef } from 'react';

import useIntersectionObserver from '../useIntersectionObserver';

interface PageParam {
  totalElements: number;
  totalPages: number;
  hasNextPages: boolean;
  pageNumber: number;
}

interface InfinitePost extends PageParam {
  content: CardInfo[];
}

const PAGE_SIZE = 3;
const DEFAULT_PAGE = 0;

const useInfinitePosts = () => {
  const fetchPosts = async ({ pageParam = DEFAULT_PAGE }: QueryFunctionContext): Promise<InfinitePost> => {
    const axiosClient = axios.create({
      baseURL: 'https://test.pingpongg.shop',
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    });

    const {
      data: { data },
    } = await axiosClient.get('/api/v1/posts', {
      params: {
        isShare: false,
        page: pageParam,
        size: PAGE_SIZE,
      },
    });

    return data;
  };

  const { data, fetchNextPage, isSuccess, isLoading, isError } = useInfiniteQuery({
    queryKey: ['infinitePosts'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNumber >= lastPage.totalPages) return false;
      return lastPage.pageNumber + 1;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.pageNumber <= 0) return false;
      return firstPage.pageNumber - 1;
    },
  });

  const posts = data?.pages.flatMap((page) => page.content) ?? [];

  return {
    posts,
    fetchNextPage,
    isSuccess,
    isLoading,
    isError,
  };
};

export default useInfinitePosts;
