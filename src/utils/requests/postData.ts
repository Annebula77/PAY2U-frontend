import { ZodError, ZodSchema } from 'zod';
import axios from 'axios';

const postData = async <T, U>(
  url: string,
  responseSchema: ZodSchema<T>,
  bodySchema: ZodSchema<U> | null,
  body: U | null,
  params: Record<string, number> | null,
  rejectWithValue: (message: string) => void,
  token?: string
): Promise<T> => {
  try {
    const validatedBody = bodySchema ? bodySchema.parse(body) : body;

    const config = {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      params,
    };

    const response = await axios.post(url, validatedBody, config);

    return responseSchema.parse(response.data);
  } catch (err) {
    if (err instanceof ZodError) {
      const errorMessages = err.errors
        .map(error => `${error.path.join('.')} - ${error.message}`)
        .join(', ');
      console.error('Zod validation error', err.errors);
      rejectWithValue(`Validation error: ${errorMessages}`);
    } else if (axios.isAxiosError(err)) {
      if (err.response) {
        rejectWithValue(
          err.response.data.message || 'An unknown network error occurred'
        );
      } else {
        rejectWithValue('A network error occurred');
      }
    } else {
      rejectWithValue('An unknown error occurred');
    }
    throw new Error('Error processing request');
  }
};

export default postData;
