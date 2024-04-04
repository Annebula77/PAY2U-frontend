import { jwtDecode } from 'jwt-decode';

export const getClientIdFromToken = (): number | null => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    console.log('Токен не найден.');
    return null;
  }

  try {
    const decoded: { user_id?: number } = jwtDecode(token);
    if (decoded.user_id === undefined) {
      console.log('user_id в токене не найден.');
      return null;
    }
    return decoded.user_id;
  } catch (error) {
    console.error('Ошибка при декодировании токена:', error);
    return null;
  }
};
