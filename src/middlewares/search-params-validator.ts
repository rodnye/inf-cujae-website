import { NextResponse } from 'next/server';
import { Middleware } from './lib';
import { SomeZodObject, ZodError } from 'zod';

/**
 * Usar zod.coerce, debido a que los valores obtenidos son todos string
 */
export const searchParamsValidator =
  (schema: SomeZodObject): Middleware =>
  async (req) => {
    const searchParams = new URL(req.url).searchParams;
    const parsedParams = Object.fromEntries(searchParams.entries());

    // Validar el objeto completo
    try {
      const validatedParams = schema.parse(parsedParams);
      return {
        pass: true,
        data: { searchParams: validatedParams },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          pass: false,
          response: NextResponse.json(
            {
              error: 'Invalid query parameters',
              details: error.errors,
            },
            { status: 400 },
          ),
        };
      }
      return {
        pass: false,
        response: NextResponse.json(
          { error: 'Server error during validation' },
          { status: 500 },
        ),
      };
    }
  };
