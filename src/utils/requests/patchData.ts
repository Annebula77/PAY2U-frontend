import { ZodError, ZodSchema } from 'zod';
import axios from 'axios';

const patchData = async <T, U>(
  url: string,
  responseSchema: ZodSchema<T>,
  bodySchema: ZodSchema<U>,
  body: U,
  rejectWithValue: (message: string) => void,
  token?: string
): Promise<T> => {
  try {
    const validatedBody = bodySchema.parse(body);

    const config = {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    };

    const response = await axios.patch(url, validatedBody, config);

    return responseSchema.parse(response.data);
  } catch (err) {
    if (err instanceof ZodError) {
      console.error('Zod validation error', err.errors);
      rejectWithValue(`Validation error: ${err.message}`);
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

export default patchData;
