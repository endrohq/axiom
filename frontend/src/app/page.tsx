'use client';

import Banner from '../components/screens/home/Banner';
import FactChecksOverview from '../components/screens/home/FactChecksOverview';
import UseCases from '../components/screens/home/UseCases';

export default function Page() {
  return (
    <>
      <Banner />
      <div className="bg-blue-100 py-1.5"></div>
      <UseCases />
      <FactChecksOverview />
    </>
  );
}
