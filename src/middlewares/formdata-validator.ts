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
    const formDataParsed: Record<string, string | number | boolean | Object> =
      {};

    for (const [key, value] of formData.entries()) {
      const shape = schema.shape[key];
      let convertedValue: any = value;

      if (shape) {
        if (shape instanceof ZodString) {
          convertedValue = z.coerce.string().parse(value);
        } else if (shape instanceof ZodNumber) {
          convertedValue = z.coerce.number().parse(value);
        } else if (shape instanceof ZodBoolean) {
          convertedValue = z.coerce.boolean().parse(value);
        } else if (shape instanceof ZodObject) {
          try {
            if (typeof value !== 'string') throw new Error('Not json');
            convertedValue = JSON.parse(value);
          } catch (e) {
            convertedValue = 'error';
          }
        }
      }

      formDataParsed[key] = value;
    }

    try {
      const body = schema.parse(formDataParsed);
      // Si el esquema esta en orden, guardarlo en data.body
      return {
        pass: true,
        data: {
          body,
        },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          pass: false,
          response: NextResponse.json(
            {
              error: 'Invalid request body',
              details: error.message,
            },
            { status: 400 },
          ),
        };
      }
      return {
        pass: false,
        response: NextResponse.json(
          { error: 'Server error! Necesita revisión' },
          { status: 500 },
        ),
      };
    }
  };
