export const SELECTED_TAB = 'SELECTED_TAB';

export function setSelectedTab(tab) {
  return dispatch => {
    dispatch({
      type: SELECTED_TAB,
      payload: { selectedTab: tab, updatedAt: new Date() },
    });
  };
}
