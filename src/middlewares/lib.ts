import { NextRequest, NextResponse } from 'next/server';

// Response y Request personalizados para soportar middlewares
export type MiddlewareRequest = NextRequest & {
  data: {
    [key: string]: any;
  };
};
export type MiddlewareResponse =
  | {
      pass: false;
      response: NextResponse;
    }
  | {
      pass: true;
      data?: MiddlewareRequest['data'];
    };

type ExtraProps = {
  params: Promise<Record<string, string>>;
};
export type RequestHandler = (
  r: MiddlewareRequest,
  extra: ExtraProps,
) => Promise<NextResponse>;
export type Middleware = (
  r: MiddlewareRequest,
  extra: ExtraProps,
) => Promise<MiddlewareResponse>;

/**
 * Hight order function para gestionar middlewares como en Express.js
 */
export const withMiddlewares =
  (middlewares: Middleware[], handler: RequestHandler) =>
  async (request: MiddlewareRequest, extra: ExtraProps) => {
    for (const middleware of middlewares) {
      const response = await middleware(request, extra);

      if (!response.pass) {
        return response.response;
      }

      if (response.data) {
        request.data = {
          ...request.data,
          ...response.data,
        };
      }
    }

    return await handler(request, extra);
  };
