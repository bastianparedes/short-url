'use client';

import { useState } from 'react';
import { trpcClient } from '../../lib/trpc/client';
import Loader from './_components/Loader';
import { FaRegCopy } from 'react-icons/fa';
import './styles.css';

const Page = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [isTrembling, setIsTrembling] = useState(false);

  const onChangeLongUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongUrl(e.target.value);
    setShortUrl(null);
  };

  const handleClickCopy = () => {
    if (typeof shortUrl === 'string')
      window.navigator.clipboard.writeText(shortUrl);
    setIsTrembling(true);
    setTimeout(() => {
      setIsTrembling(false);
    }, 100);
  };

  const insertUrl = trpcClient.insertUrl.useMutation({
    onError() {
      alert('Url not valid');
    },
    onSuccess(data) {
      setShortUrl(data);
    }
  });
  // bg-gradient-to-bl from-white to-black bg-clip-text text-transparent

  const handleOnSubmit = () => {
    insertUrl.mutate({ longUrl });
  };

  return (
    <>
      {insertUrl.isLoading && <Loader />}
      <main className="min-h-svh p-5 lg:p-24">
        <div className="flex flex-col items-center relative">
          <div className="flex flex-col justify-center gap-5 mb-10">
            <h1 className="text-4xl text-balance text-center bg-gradient-to-r from-indigo-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent lg:text-8xl">
              Shorten your URLs, hide them, and make them easy to share
            </h1>
            <h2 className="text-center text-gray-600 text-2xl lg:text-4xl">
              Helping to create smaller, manageable, and shareable URLs
            </h2>
          </div>
          <form
            className="h-32 text-4xl w-full flex flex-col gap-1 lg:w-4/5 lg:flex-row lg:gap-0"
            action={handleOnSubmit}
          >
            <input
              className="px-5 flex-1 border-2 border-solid border-black focus:outline-none lg:border-r-0"
              type="text"
              value={longUrl}
              onChange={onChangeLongUrl}
            />
            <input
              className="bg-sky-500 px-2 rounded-lg focus:outline-none lg:border-2 lg:border-solid lg:border-black lg:border-l-0 lg:rounded-none"
              type="submit"
              value="Shorten it!"
            />
          </form>
          <div className="flex h-20 text-3xl mt-10 w-full lg:w-3/5">
            {shortUrl !== null && (
              <>
                <div className="px-2 border-2 border-solid border-black border-r-0 flex-1 overflow-hidden flex items-center focus:outline-none">
                  <span className="whitespace-nowrap">{shortUrl}</span>
                </div>
                <button
                  className={`bg-sky-500 h-full flex justify-center items-center border-2 border-solid border-black border-l-0 aspect-square ${isTrembling ? 'animate-tremble' : ''}`}
                  onClick={handleClickCopy}
                >
                  <FaRegCopy />
                </button>
              </>
            )}
          </div>
          <article className="mt-5">
            <h2 className="text-2xl font-bold lg:text-3xl">
              What is a shorter url?
            </h2>
            <p className="text-xl lg:text-2xl">
              A URL shortener is a condensed version of a long URL address.
              Short URLs serve several purposes:
            </p>
            <ol className="text-xl ml-5 list-disc lg:text-2xl lg:ml-10">
              <li>
                <p>
                  <strong>Ease of use</strong>: Short URLs are easier to copy,
                  paste, and share on platforms like social media, text
                  messages, and emails. They are particularly useful when space
                  is limited, such as on Twitter, where the character count is
                  restricted.
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
                  <strong>Redirection</strong>: URL shortening services can act
                  as redirectors, allowing users to change the destination
                  address of a link without changing the short URL itself.
                </p>
              </li>
            </ol>
          </article>
        </div>
      </main>
    </>
  );
};

export default Page;
