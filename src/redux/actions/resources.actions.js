import { getAll } from '../api/resources';

// Action constants
export const RESOURCES = 'RESOURCES';

// actions
export function getAllResources() {
  return async dispatch => {
    try {
      const response = await getAll();

      // console.log('GET ALL RESOURCES', response);

      //

      if (response.resources) {
        dispatch({
          type: RESOURCES,
          payload: {
            status: `allResources ${new Date()}`,
            results: response.resources,
          },
        });
      } else if (response.error) {
        dispatch({
          type: RESOURCES,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error getting resources', error);
    }
  };
}
