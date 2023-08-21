import { ArrowRightOutlined } from '@shared/components/icons/ArrowRightOutlined';
import { ChatGptLogoFilled } from '@shared/components/icons/ChatGptLogoFilled';
import { DocumentOutlined } from '@shared/components/icons/DocumentOutlined';
import { ROUTE_BLOG, ROUTE_CHAT } from '@shared/utils/route.utils';
import Link from 'next/link';

export default function UseCases() {
  return (
    <div className="relative mx-auto my-20 w-8/12 space-y-6">
      <div className="lh-none pointer-events-none absolute -left-10 top-0 -z-10 m-0 p-0 text-[25rem] font-bold leading-none text-gray-100">
        1
      </div>
      <div className="z-10">
        <div className="w-6/12">
          <h3 className="mb-1 text-2xl font-bold">Use cases</h3>
          <p className="text-base leading-relaxed text-gray-800">
            Information can be found everywhere on the internet with{' '}
            <span className="font-semibold text-black">newspapers</span> and{' '}
            <span className="font-semibold text-black">chatGPT (LLM's)</span> as
            the most actively debated in recent years. For that, we have created
            an implementation to illustrate how Axiom would work in the real
            world.
          </p>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          <Link
            href={ROUTE_CHAT}
            className="bg-transition flex items-center justify-between space-x-4 rounded bg-black p-2 pr-6 text-white hover:bg-purple-950 hover:pr-4"
          >
            <div className="flex items-center  space-x-2">
              <div className="h-8 w-8 rounded-sm">
                <ChatGptLogoFilled scaleWithParent />
              </div>
              <span className="text-base font-medium">Chat GPT</span>
            </div>
            <ArrowRightOutlined className="text-gray-300" />
          </Link>
          <Link
            href={ROUTE_BLOG}
            className="bg-transition flex items-center justify-between space-x-4 rounded bg-black p-2 pr-6 text-white hover:bg-purple-950 hover:pr-4"
          >
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-orange-700">
                <DocumentOutlined className="text-xl text-orange-100" />
              </div>
              <span className="text-base">News article</span>
            </div>
            <ArrowRightOutlined className="text-gray-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
