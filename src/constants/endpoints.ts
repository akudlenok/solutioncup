const buildPathInGroup = (groupPath: string, endpoint: string) => {
  return groupPath + '/' + endpoint;
};

export const endpoints = {
  base: {
    url: '/',
    title: 'Главная',
  },
  login: {
    url: '/login',
    title: 'Авторизация',
  },
};
