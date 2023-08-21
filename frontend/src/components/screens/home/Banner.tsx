import { Button } from '@shared/components/button';

import { ROUTE_MANIFESTO } from '@shared/utils/route.utils';
import Link from 'next/link';

export default function Banner() {
  return (
    <div id="home-banner" className="grid w-full grid-cols-2 items-center">
      <div className="align-with-container-left mt-10 rounded-tr-lg bg-gray-50 py-28 shadow-[0_-35px_50px_-25px_rgba(0,0,0,0.5)]">
        <h1 className="uppercase leading-none">
          <span className="text-4xl font-medium text-black">Fact check</span>
          <br />
          <span className="text-5xl font-bold text-primary">the world</span>
        </h1>
        <p className="text-lg21 mb-4 mt-2 w-8/12 text-black">
          Information on the internet is hard to trust. It's time to change
          that.
        </p>
        <Link className="mt-2 font-semibold underline" href={ROUTE_MANIFESTO}>
          <Button size="large" variant="black">
            Read our Manifesto
          </Button>
        </Link>
      </div>
      <div className="" />
    </div>
  );
}
