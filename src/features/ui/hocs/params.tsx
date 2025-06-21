export const withParams = <T extends readonly string[]>(
  paramKeys: T,
  Page: (props: {
    params: Record<T[number], string>;
  }) => Promise<React.JSX.Element>,
) => {
  return async ({ params }: { params: Promise<Record<T[number], string>> }) => {
    return await Page({ params: await params });
  };
};
