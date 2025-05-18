import { NextResponse } from 'next/server';
import { ZodError, ZodSchema } from 'zod';
import { Middleware } from '.';

/**
 * Middleware para validar el cuerpo de la solicitud contra un esquema Zod
 */
export const jsonBodyValidator = <T extends ZodSchema>(
  schema: T,
  options: {
    errorMessage?: string;
  } = {},
): Middleware => {
  const { errorMessage = 'Invalid request body' } = options;

  return async (request) => {
    try {
      const contentType = request.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        // ups! no es de tipo json
        return {
          pass: false,
          response: NextResponse.json(
            { error: 'Content-Type must be application/json' },
            { status: 415 },
          ),
        };
      }

      // parsear
      let body;
      try {
        body = await request.json();
      } catch (e) {
        return {
          pass: false,
          response: NextResponse.json({ error: errorMessage }, { status: 400 }),
        };
      }

      // validar con Zod
      await schema.parseAsync(body);

      // retornar
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
              error: errorMessage,
              // TODO: Zod envia un JSON en forma de string en el parámetro message, hay que parsearlo y mostrar el error adecuado
              details: error.message,
            },
            { status: 400 },
          ),
        };
      }

      // estalló por otra cosa
      console.log(error);
      return {
        pass: false,
        response: NextResponse.json({ error: 'Ohhh maigot!' }, { status: 500 }),
      };
    }
  };
};
