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
    return schema.parse(response.data);
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
