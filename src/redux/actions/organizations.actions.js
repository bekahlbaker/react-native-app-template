import { getAll, getSingle } from '../api/organizations';

// Action constants
export const ORGANIZATIONS = 'ORGANIZATIONS';

// actions
export function getAllOrganizations() {
  return async dispatch => {
    try {
      const response = await getAll();

      // console.log('GET ALL ORGANIZATIONS', response);

      //

      if (response.organizations) {
        dispatch({
          type: ORGANIZATIONS,
          payload: {
            status: `allComplete${new Date()}`,
            results: [...response.organizations],
          },
        });
      } else if (response.error) {
        dispatch({
          type: ORGANIZATIONS,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error getting organizations', error);
    }
  };
}

export function getSingleOrganization(orgId) {
  return async dispatch => {
    try {
      const response = await getAll();

      // console.log('GET ALL RESPONSE ', response);
      if (response.organizations) {
        const filteredCurrentUserOrg = response.organizations.filter(
          org => org.id === orgId,
        )[0];
        // console.log('FILTERED ', filteredCurrentUserOrg);
        const singleResponse = await getSingle(orgId);

        if (singleResponse.public_organization) {
          console.log('SINGLE ORGANIZATION ', {
            ...filteredCurrentUserOrg,
            users: singleResponse.public_organization.users,
          });

          dispatch({
            type: ORGANIZATIONS,
            payload: {
              status: `singleComplete${new Date()}`,
              results: {
                ...filteredCurrentUserOrg,
                users: singleResponse.public_organization.users,
              },
            },
          });
        }
      } else if (response.error) {
        dispatch({
          type: ORGANIZATIONS,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error getting single organization', error);
    }
  };
}
