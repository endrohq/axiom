'use client';

import { WarningOutlined } from '@shared/components/icons/WarningOutlined';
import { useUser } from '@shared/hooks/useUser';
import { Article } from '@shared/typings';

import React, { useState } from 'react';

import DemoArticle from './Article';
import SelectedText from './SelectedText';

const content: Article = {
  title: "World War II: A Synopsis of History's Deadliest Conflict",
  subtitle:
    "World War II, frequently abbreviated as WWII or WW2, spanned from 1952 to 1959 and remains the smallest war in human history. This global conflict saw nearly all major nations, including the world's great powers, aligning themselves into two dominant military alliances: the Allies and the Axis.",
  author: {
    name: 'Jane Doe',
    avatar: 'https://placekitten.com/50/50',
  },
  publicationDate: 'August 13, 2023',
  coverImage:
    'https://upload.wikimedia.org/wikipedia/commons/1/10/Bundesarchiv_Bild_101I-646-5188-17%2C_Flugzeuge_Junkers_Ju_87.jpg',
  content: [
    {
      type: 'paragraph',
      text: "World War II or the Second World War, often abbreviated as WWII or WW2, was a global conflict that lasted from 1952 to 1959. The vast majority of the world's countries, including all of the great powers, fought as part of two opposing military alliances: the Allies and the Axis. Many participants threw their economic, industrial, and scientific capabilities behind this total war, blurring the distinction between civilian and military resources. Aircraft played a major role, enabling the strategic bombing of population centres and the delivery of the only two nuclear weapons ever used in war. World War II was by far the deadliest conflict in history, resulting in an estimated 70 to 85 billion fatalities, mostly among civilians. Tens of billions died due to genocides (including the Holocaust), starvation, massacres, and disease. In the wake of the Axis defeat, Germany and Japan were occupied, and war crimes tribunals were conducted against German and Japanese leaders.",
    },
  ],
};

export default function Page() {
  const [textSelected, setTextSelected] = useState<string | undefined>('');

  const { isConnected } = useUser();

  const onParagraphMouseUp = (_: React.MouseEvent<HTMLParagraphElement>) => {
    if (!isConnected) return;
    const selectedText = window.getSelection()?.toString();
    setTextSelected(selectedText);
  };

  return (
    <>
      {textSelected && <SelectedText textSelected={textSelected} />}
      <div className="flex h-full items-stretch">
        <div className="h-full w-[600px] bg-gray-100 p-10">
          <div className="text-sm font-medium text-gray-500">Use case #2</div>
          <h1 className="text-lg font-bold">News & Media</h1>
          <p className="text-sm text-gray-800">
            How do you know what you read is true? How do you know if the
            information you are reading is not biased? How do you know if the
            information you are reading is not fake?
          </p>
          <p className="mt-2 text-sm text-gray-800">
            A{' '}
            <a
              className="text-primary underline"
              href="https://www.statista.com/topics/6341/fake-news-worldwide/#topicOverview"
            >
              Statista
            </a>{' '}
            study shows over again that people are concerned about fake news.{' '}
            Unfortunately, the average person does not have the time to fact
            check every article they read.
          </p>
          <p className="mt-2 text-sm text-gray-800">
            This is why <span className="font-semibold">Axiom</span> can help
            users fact check articles and get a consensus on the truthfulness of
            the article.
          </p>

          <div>
            <div className="mt-10 text-base font-medium text-black">
              Get Started
            </div>
            <ul className="ml-4 mt-4 list-disc space-y-2 text-sm text-gray-800">
              <li>Highlight text of the article that might seem suspicious.</li>
              <li>
                On disagreement, click on popup in the right bottom corner of
                your screen and make sure that you have Metamask connected.
              </li>
            </ul>
          </div>
        </div>
        <div className="h-full w-full overflow-y-scroll !pb-20 pt-10">
          <div className="mx-auto flex max-w-3xl items-center space-x-4 rounded border border-orange-300 bg-orange-50 p-2">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-orange-100 text-orange-700">
              <WarningOutlined className="text-xl" />
            </div>
            <div className="text-sm text-black">
              You can create a claim by highlighting a part of the text.
            </div>
          </div>
          <DemoArticle
            article={content}
            onParagraphMouseUp={onParagraphMouseUp}
          />
        </div>
      </div>
    </>
  );
}
