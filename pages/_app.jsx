import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  TimeAgo.addDefaultLocale(en);

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
