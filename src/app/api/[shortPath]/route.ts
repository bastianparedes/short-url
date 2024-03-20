import { redirect } from 'next/navigation';
import { serverClient } from '../../../../lib/trpc/serverClient';

interface ShortPath {
  shortPath: string;
}

const handler = async (
  _request: Request,
  { params }: { params: ShortPath }
) => {
  const longUrl = await serverClient.getLongUrl({
    shortPath: params.shortPath
  });

  if (longUrl === undefined)
    return new Response(undefined, {
      status: 404
    });

  redirect(params.shortPath);
};

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
  handler as PATCH
};
