import {
  create,
  getSingle,
  mark,
  post,
  get,
  deleteConv,
} from '../api/conversations';

// Action constants
export const NEW_CONVERSATION = 'NEW_CONVERSATION';
export const CONVERSATIONS = 'CONVERSATIONS';
export const DELETE_CONVERSATION = 'DELETE_CONVERSATION';

// actions
export function getAllConversations(page) {
  return async dispatch => {
    try {
      const response = await get(page);

      // console.log('GET ALL  CONVERSATIONS', response);
      if (response.conversations) {
        dispatch({
          type: CONVERSATIONS,
          payload: {
            status: `allConvComplete ${new Date()}`,
            results: response.conversations,
            currentPage: response.meta.current_page,
            allPages: response.meta.total_pages,
          },
        });
      } else if (response.error) {
        dispatch({
          type: CONVERSATIONS,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error getting conversation', error);
    }
  };
}

export function createNewConversation(formdata) {
  return async dispatch => {
    try {
      const response = await create(formdata);

      // console.log('CREATE NEW CONVO', response);

      if (response.conversation) {
        dispatch({
          type: NEW_CONVERSATION,
          payload: {
            status: `newConversation ${response.conversation.id}`,
            results: response.conversation,
          },
        });
      } else if (response.error) {
        dispatch({
          type: NEW_CONVERSATION,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error posting conversation', error);
    }
  };
}

export function getSingleConversation(convoId) {
  return async dispatch => {
    try {
      const response = await getSingle(convoId);

      // console.log('GET SINGLE CONVERSATION', response);

      if (response.conversation) {
        dispatch({
          type: CONVERSATIONS,
          payload: {
            status: `singleConvComplete ${new Date()}`,
            results: response.conversation,
          },
        });
      } else if (response.error) {
        dispatch({
          type: CONVERSATIONS,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error getting conversation', error);
    }
  };
}

export function refreshSingleConversation(convoId) {
  return async dispatch => {
    try {
      const response = await getSingle(convoId);

      // console.log('GET SINGLE CONVERSATION', response);

      if (response.conversation) {
        dispatch({
          type: CONVERSATIONS,
          payload: {
            status: `refreshConvComplete ${new Date()}`,
            results: response.conversation,
          },
        });
      } else if (response.error) {
        dispatch({
          type: CONVERSATIONS,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error getting conversation', error);
    }
  };
}

export function markConversationRead(conversation) {
  return async dispatch => {
    try {
      const response = await mark(conversation.id);

      // console.log('MARK CONVO READ', response);

      if (response.conversation) {
        dispatch({
          type: CONVERSATIONS,
          payload: {
            status: `markRead ${new Date()}`,
            results: response.conversation,
          },
        });
      } else if (response.error) {
        dispatch({
          type: CONVERSATIONS,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error marking convo read', error);
    }
  };
}

export function postMessageToConversation(convoId, content) {
  return async dispatch => {
    try {
      const response = await post(convoId, content);

      // console.log('POST MESSAGE TO CONVO', response);

      if (response.message) {
        dispatch({
          type: CONVERSATIONS,
          payload: {
            status: `newMessage ${response.message.id}`,
            results: response.message,
          },
        });
      } else if (response.error) {
        dispatch({
          type: CONVERSATIONS,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error posting conversation', error);
    }
  };
}

export function deleteSingleConversation(conversation) {
  return async dispatch => {
    try {
      const response = await deleteConv(conversation.id);

      // console.log('DELETE CONVO', response);

      if (response.conversation) {
        dispatch({
          type: CONVERSATIONS,
          payload: {
            status: `deleteConvo ${new Date()}`,
          },
        });
      } else if (response.error) {
        dispatch({
          type: CONVERSATIONS,
          payload: { status: 'failed', results: [] },
        });
      }
    } catch (error) {
      // console.log('Error posting conversation', error);
    }
  };
}
