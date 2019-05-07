import {
  getAll,
  create,
  leave,
  add,
  request,
  getSingle,
  edit,
  assign,
  accept,
  remove,
  requestOtherUser,
} from '../api/groups';

// Action constants
export const GROUPS = 'GROUPS';
export const SINGLE_GROUP = 'SINGLE_GROUP';
export const CLEAR_GROUP = 'CLEAR_GROUP';
export const ADD_TO_GROUP = 'ADD_TO_GROUP';
export const REQUEST_TO_JOIN = 'REQUEST_TO_JOIN';
export const ASSIGN_ADMIN = 'ASSIGN_ADMIN';
export const CREATE_GROUP = 'CREATE_GROUP';
export const LEAVE_GROUP = 'LEAVE_GROUP';

// actions
export function getAllGroups(page) {
  return async dispatch => {
    try {
      const response = await getAll(page);

      // console.log('GET ALL GROUPS', response);

      if (response.groups) {
        dispatch({
          type: GROUPS,
          payload: {
            status: `allGroups ${new Date()}`,
            results: response.groups,
            currentPage: response.meta.current_page,
            allPages: response.meta.total_pages,
          },
        });
      } else if (response.error) {
        dispatch({
          type: GROUPS,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error getting groups', error);
    }
  };
}

export function getSingleGroup(groupId) {
  return async dispatch => {
    try {
      const response = await getSingle(groupId);

      console.log('GET SINGLE GROUP', response);

      //

      if (response.group) {
        dispatch({
          type: SINGLE_GROUP,
          payload: {
            status: `singleGroupComplete ${new Date()}`,
            results: response.group,
          },
        });
      } else if (response.error) {
        dispatch({
          type: SINGLE_GROUP,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error getting single group', error);
    }
  };
}

export function clearGroup() {
  return async dispatch => {
    dispatch({
      type: CLEAR_GROUP,
      payload: { status: 'pending', results: [] },
    });
  };
}

export function createGroup(formdata, users) {
  console.log(formdata);
  return async dispatch => {
    try {
      const response = await create(formdata, users);

      console.log('CREATE GROUP', response);

      if (response.group) {
        dispatch({
          type: CREATE_GROUP,
          payload: {
            status: `newComplete ${new Date()}`,
            results: response.group,
            error: null,
          },
        });
      } else if (response.error) {
        dispatch({
          type: CREATE_GROUP,
          payload: { status: 'failed', results: null, error: response.error },
        });
      }
    } catch (error) {
      // console.log('Error creating groups', error);
    }
  };
}

export function editGroup(groupId, formdata) {
  // console.log(groupId);
  return async dispatch => {
    try {
      const response = await edit(groupId, formdata);

      // console.log('EDIT GROUP', response);

      //

      if (response.group) {
        dispatch({
          type: GROUPS,
          payload: {
            status: `updateComplete ${new Date()}`,
            results: response.group,
          },
        });
      } else if (response.error) {
        dispatch({
          type: GROUPS,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error editing groups', error);
    }
  };
}

export function leaveGroup(group) {
  return async dispatch => {
    try {
      const response = await leave(group.id);

      console.log('LEAVE GROUP', response);

      //

      if (response.group) {
        dispatch({
          type: LEAVE_GROUP,
          payload: {
            status: `leaveGroup ${new Date()}`,
            results: group,
          },
        });
      } else if (response.error) {
        dispatch({
          type: LEAVE_GROUP,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error leaving group', error);
    }
  };
}

export function addToGroup(groupId, userId, isAdmin) {
  return async dispatch => {
    try {
      const response = await add(groupId, userId, isAdmin);

      // console.log('ADD TO GROUP', response);

      //

      if (!response.error) {
        dispatch({
          type: ADD_TO_GROUP,
          payload: {
            status: `addComplete ${new Date()}`,
            results: response.group,
          },
        });
      } else {
        dispatch({
          type: ADD_TO_GROUP,
          payload: { status: 'addFailed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error adding user to group', error);
    }
  };
}

export function requestToJoinGroup(group) {
  // console.log('request to join ', group);
  return async dispatch => {
    try {
      const response = await request(group.id);

      // console.log('REQUEST TO JOIN GROUP', response);

      //

      if (response.group) {
        dispatch({
          type: ADD_TO_GROUP,
          payload: {
            status: `requestComplete ${new Date()}`,
            results: group,
          },
        });
      } else if (response.error) {
        dispatch({
          type: ADD_TO_GROUP,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error requesting to join group', error);
    }
  };
}

export function requestOtherUserJoinGroup(group, userId) {
  // console.log('request to join ', group);
  return async dispatch => {
    try {
      const response = await requestOtherUser(group.id, userId);

      // console.log('REQUEST OTHE USER TO JOIN GROUP', response);

      //

      if (!response.error) {
        dispatch({
          type: ADD_TO_GROUP,
          payload: {
            status: `requestComplete ${new Date()}`,
            results: group,
          },
        });
      } else if (response.error) {
        dispatch({
          type: ADD_TO_GROUP,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error requesting to join group', error);
    }
  };
}

export function removeFromGroup(group, userId) {
  // console.log('request to join ', group);
  return async dispatch => {
    try {
      const response = await remove(group.id, userId);

      console.log('REMOVE FROM GROUP RESPONSE', response);

      //

      if (!response.error) {
        dispatch({
          type: ADD_TO_GROUP,
          payload: {
            status: `removeComplete ${new Date()}`,
            results: response.group,
          },
        });
      } else if (response.error) {
        dispatch({
          type: ADD_TO_GROUP,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error requesting to join group', error);
    }
  };
}

export function acceptRequestToJoin(group, user) {
  // console.log('request to join ', group);
  return async dispatch => {
    try {
      const response = await accept(group.id, user.id);

      // console.log('ACCEPT REQUEST TO JOIN', response);

      //

      if (response.group) {
        dispatch({
          type: ADD_TO_GROUP,
          payload: {
            status: `acceptRequestComplete ${new Date()}`,
            results: response.group,
          },
        });
      } else if (response.error) {
        dispatch({
          type: ADD_TO_GROUP,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error requesting to join group', error);
    }
  };
}

export function assignAsGroupAdmin(group, user) {
  return async dispatch => {
    try {
      const response = await assign(group.id, user.id);

      // console.log('ASSIGN GROUP ADMIN', response);

      //

      if (!response.error) {
        dispatch({
          type: ASSIGN_ADMIN,
          payload: {
            status: `assignComplete ${new Date()}`,
            results: {
              ...group,
              admins: [...group.admins, user],
            },
          },
        });
      } else if (response.error) {
        dispatch({
          type: ASSIGN_ADMIN,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error requesting to join group', error);
    }
  };
}
