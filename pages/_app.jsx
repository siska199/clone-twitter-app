import "../styles/globals.css";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import store from "../redux/store";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  TimeAgo.setDefaultLocale(en.locale);
  TimeAgo.addLocale(en);
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
