'use client';

import MetaMaskProvider from '@shared/hooks/useMetaMask';
import React from 'react';

type ProviderType = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProviderType) => {
  return <MetaMaskProvider>{children}</MetaMaskProvider>;
};

export default Providers;
