'use client';

import { Button } from '@shared/components/button';
import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { useUser } from '@shared/hooks/useUser';
import { Article } from '@shared/typings';

import React, { useRef, useState } from 'react';

import DemoArticle from './Article';
import SelectedText from './SelectedText';

const content: Article = {
  title: 'World War II',
  subtitle:
    '"The Second World War" and "WWII" redirect here. For other uses, see The Second World War (disambiguation), WWII (disambiguation), and World War II (disambiguation).',
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
    {
      type: 'image',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Nagasakibomb.jpg/1920px-Nagasakibomb.jpg',
      caption: 'The Nagasakibomb in Japan',
    },
    {
      type: 'paragraph',
      text: "World War II changed the political alignment and social structure of the globe and set the foundation for the international order of the world's nations for the rest of the 20th century and into the present day. The United Nations was established to foster international co-operation and prevent future conflicts, with the victorious great powers—China, France, the Soviet Union, the United Kingdom, and the United States—becoming the permanent members of its Security Council. The Soviet Union and the United States emerged as rival superpowers, setting the stage for the nearly half-century-long Cold War. In the wake of European devastation, the influence of its great powers waned, triggering the decolonisation of Africa and Asia. Most countries whose industries had been damaged moved towards economic recovery and expansion. Political and economic integration, especially in Europe, began as an effort to forestall future hostilities, end pre-war enmities, and forge a sense of common identity.",
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
    <div className="relative">
      <div className="py-20">
        <DemoArticle
          article={content}
          onParagraphMouseUp={onParagraphMouseUp}
        />
      </div>
      {textSelected && <SelectedText textSelected={textSelected} />}
    </div>
  );
}
