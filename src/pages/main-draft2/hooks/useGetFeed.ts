import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { InterfaceFeed } from '@/types';

export default function useGetFeed() {
  const { data } = useQuery({
    queryKey: ['test'],
    queryFn: async () => {
      const response = await (await axios.get('http://localhost:3000/data.json')).data;
      return response as InterfaceFeed[];
    },
  });

  return { data };
}
