import { getErrorMessage } from '../utils/errorHandler';
import { instance } from './instance.api';

export const clientApi = {
  searchClient: async (searchQuery: string) => {
    try {
      const response = await instance.get(
        `/clients/search?email=${searchQuery}`,
      );

      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};
