'use client';

import { useState } from 'react';
import { trpcClient } from '../../lib/trpc/client';
import Loader from './_components/Loader';
import './styles.css';

const Page = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [isTrembling, setIsTrembling] = useState(false);

  const handleClickCopy = () => {
    if (typeof shortUrl === 'string')
      window.navigator.clipboard.writeText(shortUrl);
    setIsTrembling(true);
    setTimeout(() => {
      setIsTrembling(false);
    }, 100);
  };

  const insertUrl = trpcClient.insertUrl.useMutation({
    onSuccess(data) {
      setShortUrl(data);
    }
  });

  const handleOnSubmit = () => {
    insertUrl.mutate({ longUrl });
  };

  return (
    <>
      {insertUrl.isLoading && <Loader />}
      <main className="flex min-h-svh flex-col items-center p-24">
        {shortUrl === null ? (
          <form
            className="border-2 border-solid border-black flex h-32 text-4xl"
            action={handleOnSubmit}
          >
            <input
              className="px-5 focus:outline-none"
              type="text"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />
            <input
              className="bg-sky-500 px-5 focus:outline-none"
              type="submit"
              value="Shorten it!"
            />
          </form>
        ) : (
          <div className="border-2 border-solid border-black flex h-32 text-4xl">
            <input
              className="px-5 focus:outline-none"
              type="text"
              value={shortUrl}
              readOnly
            />
            <button
              className={`bg-sky-500 px-5 ${isTrembling ? 'animate-tremble' : ''}`}
              onClick={handleClickCopy}
            >
              Copy
            </button>
          </div>
        )}
        <article className="mt-5">
          <h2 className="text-3xl font-bold">What is a shorter url?</h2>
          <p className="text-2xl">
            A URL shortener is a condensed version of a long URL address. Short
            URLs serve several purposes:
          </p>
          <ol className="text-2xl ml-10 list-disc">
            <li>
              <p>
                <strong>Ease of use</strong>: Short URLs are easier to copy,
                paste, and share on platforms like social media, text messages,
                and emails. They are particularly useful when space is limited,
                such as on Twitter, where the character count is restricted.
              </p>
            </li>
            <li>
              <p>
                <strong>Aesthetics</strong>: Short URLs can make messages
                cleaner and more aesthetically pleasing, especially in posts
                where the length of the full URL might be disruptive.
              </p>
            </li>
            <li>
              <p>
                <strong>Tracking and analytics</strong>: Some URL shortening
                services provide click analytics, which can be useful for
                tracking how many times a link has been clicked and where the
                visitors are coming from.
              </p>
            </li>
            <li>
              <p>
                <strong>Redirection</strong>: URL shortening services can act as
                redirectors, allowing users to change the destination address of
                a link without changing the short URL itself.
              </p>
            </li>
          </ol>
        </article>
      </main>
    </>
  );
};

export default Page;
