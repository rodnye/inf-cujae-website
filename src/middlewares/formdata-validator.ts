import { NextResponse } from 'next/server';
import { Middleware } from './lib';
import {
  SomeZodObject,
  z,
  ZodBoolean,
  ZodError,
  ZodNumber,
  ZodObject,
  ZodString,
} from 'zod';

/**
 * Schema para validar tipo File en formdata
 */
export const fileSchema = z.custom<File>((value) => value instanceof File);

export const formdataValidator =
  (schema: SomeZodObject): Middleware =>
  async (request) => {
    // chequear Content-Type
    if (!request.headers.get('content-type')?.includes('multipart/form-data')) {
      return {
        pass: false,
        response: NextResponse.json(
          { error: 'Content-Type must be multipart/form-data' },
          { status: 415 },
        ),
      };
    }

    const formData = await request.formData();
    const formDataParsed: Record<string, unknown> = {};

    for (const [key, value] of formData.entries()) {
      const shape = schema.shape[key];

      if (!shape) continue;

      try {
        if (shape instanceof ZodString) {
          formDataParsed[key] = String(value);
        } else if (shape instanceof ZodNumber) {
          formDataParsed[key] = Number(value);
        } else if (shape instanceof ZodBoolean) {
          formDataParsed[key] = value === 'true';
        } else if (shape instanceof ZodObject) {
          formDataParsed[key] =
            typeof value === 'string' ? JSON.parse(value) : value;
        } else if (shape === fileSchema) {
          formDataParsed[key] = value;
        } else {
          formDataParsed[key] = value;
        }
      } catch (error) {
        return {
          pass: false,
          response: NextResponse.json(
            {
              error: `Invalid format for field ${key}`,
              details: error instanceof Error ? error.message : String(error),
            },
            { status: 400 },
          ),
        };
      }
    }

    // validar el obheto completo
    try {
      const body = schema.parse(formDataParsed);
      return {
        pass: true,
        data: { body },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          pass: false,
          response: NextResponse.json(
            {
              error: 'Invalid request body',
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
