/* eslint-disable react/jsx-props-no-spreading */
import '../styles/global.css';
import { AppProps } from 'next/app';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
