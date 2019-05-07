import { getAll } from '../api/categories';

// Action constants
export const CATEGORIES = 'CATEGORIES';

// actions
export function getAllCategories() {
  return async dispatch => {
    try {
      const response = await getAll();

      // console.log('GET ALL CATEGORIES', response);

      if (response.categories) {
        dispatch({
          type: CATEGORIES,
          payload: {
            status: `complete ${new Date()}`,
            results: [...response.categories],
          },
        });
      } else if (response.error) {
        dispatch({
          type: CATEGORIES,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error getting categories', error);
    }
  };
}
