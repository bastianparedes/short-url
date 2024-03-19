import React from 'react';

import { TrpcProvider } from './_contexts/TrpcProvider';
import { url } from '../../lib/trpc/config';
import 'bastianparedes/styles/global.css';
import 'bastianparedes/styles/normalize.css';
import '../../../styles/styles.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es-ES">
      <head>
        <meta charSet="utf-8" />
        <title>Bastián Paredes</title>
      </head>
      <body>
        <TrpcProvider url={url}>{children}</TrpcProvider>
      </body>
    </html>
  );
};

export default Layout;
