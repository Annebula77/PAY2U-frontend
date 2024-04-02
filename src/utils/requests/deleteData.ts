import axios from 'axios';
import { ZodError, ZodSchema } from 'zod';

const deleteData = async <U>(
  url: string,
  bodySchema: ZodSchema<U> | null,
  body: U | null,
  params: Record<string, number> | null,
  rejectWithValue: (message: string) => void,
  token?: string
): Promise<void> => {
  try {
    const validatedBody = bodySchema ? bodySchema.parse(body) : body;

    const config = {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      params,
      data: validatedBody,
    };

    await axios.delete(url, config);
  } catch (err) {
    if (err instanceof ZodError) {
      console.error('Zod validation error', err.errors);
      rejectWithValue('Validation error');
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

export default deleteData;
