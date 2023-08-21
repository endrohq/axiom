'use client';

import { FlagOutlined } from '@shared/components/icons/FlagOutlined';

import ChatUI from '../../components/screens/chat';

export default function Page() {
  return (
    <div className="flex h-full items-stretch">
      <div className="h-full w-[600px] bg-gray-100 p-10">
        <div className="text-sm font-medium text-gray-500">Use case #1</div>
        <h1 className="text-lg font-bold">LLM Fact checks</h1>
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
      <div className="h-full w-full">
        <ChatUI />
      </div>
    </div>
  );
}
