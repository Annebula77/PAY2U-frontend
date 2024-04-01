import { ZodError, ZodSchema } from 'zod';
import axios from 'axios';

const fetchData = async <T>(
  url: string,
  schema: ZodSchema<T>,
  rejectWithValue: (message: string) => void,
  token?: string
): Promise<T> => {
  try {
    const config = token
      ? {
          headers: { Authorization: `Bearer ${token}` },
        }
      : undefined;
    const response = await axios.get(url, config);
    // NOTE: убрать консоль-логи
    // console.log("страница:", url);
    // console.log("Данные от сервера:", response.data);
    // return schema.parse(response.data);
    const parsedData = schema.parse(response.data);
    console.log('Данные после валидации Zod:', parsedData);
    return parsedData;
  } catch (err) {
    if (err instanceof ZodError) {
      console.error('Parsing errors', err.errors);
      rejectWithValue('Parsing errors');
    } else if (axios.isAxiosError(err)) {
      if (err.response) {
        rejectWithValue(
          err.response.data.message || 'An unknown network error occurred'
        );
      } else {
        rejectWithValue('An unknown network error occurred');
      }
    } else {
      rejectWithValue('An unknown error occurred');
    }
    throw new Error('Error fetching data');
  }
};
export default fetchData;
