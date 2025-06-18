import { NextResponse } from 'next/server';
import { Middleware } from './lib';

/**
 * Este middleware verifica y obtiene el valor de los params route indicados (ej: /api/blog/[slug])
 */
export const paramsValidator =
  (arg: string | string[]): Middleware =>
  async (_, extra) => {
    const params = await extra.params;
    const data: Record<string, string | string[]> = {};
    const requestedParams = typeof arg == 'string' ? [arg] : arg;

    for (const key of requestedParams) {
      if (!params[key]) {
        console.error('No existe el parámetro `' + key + '` en la llamada.');
        return {
          pass: false,
          response: NextResponse.json(
            { message: 'No existe el parámetro `' + key + '` en la llamada.' },
            { status: 500 },
          ),
        };
      }

      data[key] = params[key];
    }

    return {
      pass: true,
      data: {
        params: data,
      },
    };
  };
