export const SET_YPSOMED_ACCOUNT = 'SET_YPSOMED_ACCOUNT';
export const RESET_YPSOMED_ACCOUNT = 'RESET_YPSOMED_ACCOUNT';

export const setYpsomedAccount = email => {
  return {
    type: SET_YPSOMED_ACCOUNT,
    payload: email
  }
};

export const resetYpsomedAccount = () => {
  return {
    type: RESET_YPSOMED_ACCOUNT
  }
};
