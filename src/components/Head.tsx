export const Head = () => {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* Preconnect to critical domains */}
      <link rel="preconnect" href="https://static.parastorage.com" />
      <link rel="preconnect" href="https://static.wixstatic.com" />
      <link rel="dns-prefetch" href="https://static.wixstatic.com" />
      {/* Font optimization with font-display: swap for faster rendering */}
      <link rel="preload" as="font" href="https://static.parastorage.com/fonts/roboto-bold.woff2" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" as="font" href="https://static.parastorage.com/fonts/roboto.woff2" type="font/woff2" crossOrigin="anonymous" />
    </>
  );
};
