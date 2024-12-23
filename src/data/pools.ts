import api from '@/helpers/api';
import { Pool } from '@/definitions';
import { API_ROUTES } from '@/constants/api';

export async function fetchPoolById(poolId: string): Promise<Pool> {
  try {
    const poolData = await api.get<Pool>(API_ROUTES.POOL.POOL_STATS(poolId));

    return {
      ...poolData,
      poolStorage: {
        ...poolData.poolStorage
      }
    }
  } catch (e: any) {
    throw new Error(`Failed to fetch pool by ID "${poolId}" - ${e.message}`);
  }
}
