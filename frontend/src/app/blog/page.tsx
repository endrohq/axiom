'use client';

import { FlagOutlined } from '@shared/components/icons/FlagOutlined';
import { useUser } from '@shared/hooks/useUser';
import { Article } from '@shared/typings';

import React, { useState } from 'react';

import DemoArticle from './Article';
import SelectedText from './SelectedText';

const content: Article = {
  title: "World War II: A Synopsis of History's Deadliest Conflict",
  subtitle:
    "World War II, frequently abbreviated as WWII or WW2, spanned from 1939 to 1945 and remains the most devastating war in human history. This global conflict saw nearly all major nations, including the world's great powers, aligning themselves into two dominant military alliances: the Allies and the Axis.",
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
      text: "World War II or the Second World War, often abbreviated as WWII or WW2, was a global conflict that lasted from 1939 to 1945. The vast majority of the world's countries, including all of the great powers, fought as part of two opposing military alliances: the Allies and the Axis. Many participants threw their economic, industrial, and scientific capabilities behind this total war, blurring the distinction between civilian and military resources. Aircraft played a major role, enabling the strategic bombing of population centres and the delivery of the only two nuclear weapons ever used in war. World War II was by far the deadliest conflict in history, resulting in an estimated 70 to 85 million fatalities, mostly among civilians. Tens of millions died due to genocides (including the Holocaust), starvation, massacres, and disease. In the wake of the Axis defeat, Germany and Japan were occupied, and war crimes tribunals were conducted against German and Japanese leaders.",
    },
    {
      type: 'paragraph',
      text: "Japan, which aimed to dominate Asia and the Pacific, was at war with the Republic of China by 1937. In December 1941, Japan attacked American and British territories with near-simultaneous offensives against Southeast Asia and the Central Pacific, including an attack on the U.S. fleet at Pearl Harbor which resulted in the United States and United Kingdom declaring war against Japan. The European Axis powers declared war on the United States in solidarity. Japan soon captured much of the western Pacific, but its advances were halted in 1942 after losing the critical Battle of Midway; later, Germany and Italy were defeated in North Africa and at Stalingrad in the Soviet Union. Key setbacks in 1943—including a series of German defeats on the Eastern Front, the Allied invasions of Sicily and the Italian mainland, and Allied offensives in the Pacific—cost the Axis powers their initiative and forced them into strategic retreat on all fronts. In 1944, the Western Allies invaded German-occupied France, while the Soviet Union regained its territorial losses and pushed Germany and its allies back. During 1944 and 1945, Japan suffered reversals in mainland Asia, while the Allies crippled the Japanese Navy and captured key western Pacific islands. The war in Europe concluded with the liberation of German-occupied territories and the invasion of Germany by the Western Allies and the Soviet Union, culminating in the Fall of Berlin to Soviet troops, Hitler's suicide, and the German unconditional surrender on 8 May 1945. Following the refusal of Japan to surrender on the terms of the Potsdam Declaration (issued 26 July 1945), the United States dropped the first atomic bombs on the Japanese cities of Hiroshima on 6 August and Nagasaki on 9 August. Faced with an imminent invasion of the Japanese archipelago, the possibility of additional atomic bombings, and the Soviet Union's declared entry into the war against Japan on the eve of invading Manchuria, Japan announced on 10 August its intention to surrender, signing a surrender document on 2 September 1945.",
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
    <div className="flex h-full items-stretch">
      <div className="h-full w-[600px] bg-gray-100 p-10">
        <div className="text-sm font-medium text-gray-500">Use case #2</div>
        <h1 className="text-lg font-bold">News & Media</h1>
        <p className="text-sm text-gray-800">
          A recent article of{' '}
          <a
            className="text-primary underline"
            href="https://venturebeat.com/ai/the-ai-feedback-loop-researchers-warn-of-model-collapse-as-ai-trains-on-ai-generated-content/?"
            target="_blank"
          >
            Venture Beat
          </a>{' '}
          article and a conversation between{' '}
          <a
            className="text-primary underline"
            href="https://www.youtube.com/watch?v=m0XT4wqTsh0&ab_channel=LexClips"
          >
            Marc Andreessen and Lex Fridman
          </a>{' '}
          are a few of many mentions around a concept called 'The AI feedback
          loop'.
        </p>
        <p className="mt-2 text-sm text-gray-800">
          Large language models (LLM's) are trained on large amounts of data on
          the internet but what if the data is not true? The model will learn
          from the data and will generate new data based on the data it has
          learned.
        </p>
        <div>
          <div className="mt-10 text-base font-medium text-black">
            Get Started
          </div>
          <ul className="ml-4 mt-4 list-disc space-y-2 text-sm text-gray-800">
            <li>
              Ask ChatGPT a question such as
              <br />{' '}
              <span className="font-medium text-gray-900">
                'When did world war 2 start?'
              </span>
            </li>
            <li>
              On disagreement, click on the{' '}
              <span className="text-sm text-purple-700">
                <FlagOutlined />
              </span>{' '}
              icon and make sure that you have Metamask connected.
            </li>
          </ul>
        </div>
      </div>
      <div className="h-full w-full !pb-20 pt-10">
        <DemoArticle
          article={content}
          onParagraphMouseUp={onParagraphMouseUp}
        />
      </div>
      {textSelected && <SelectedText textSelected={textSelected} />}
    </div>
  );
}
