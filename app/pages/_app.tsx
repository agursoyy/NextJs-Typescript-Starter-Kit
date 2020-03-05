import { Provider } from 'mobx-react';
import App, { AppInitialProps, Container } from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';
import Router from 'next/router';
import nookies from 'nookies';
import React, { Fragment } from 'react';
import NProgress from 'nprogress';
import { getURL } from '../routes';  // to get the url of the given route name.
import Store from '../stores';

import '../styles/index.scss';
import Language from '../stores/language';
import IPageConfig from '../interfaces/PageConfig';
const { publicRuntimeConfig } = getConfig();

interface IProps extends AppInitialProps {  // Component comes from AppInitialProps
  storeData: string;
  pageConfig: IPageConfig
}
type x = {
  name: string
}
export default class MyApp extends App<IProps> {
  static async getInitialProps({ Component, ctx }: {
    ctx: any;
    Component: any;
  }): Promise<IProps> {



    let pageProps = {
      pageConfig: Object  // page Config of the child component (Component).
    };


    //console.log(pageProps);
    let pageConfig = publicRuntimeConfig.pageConfig;    // get page config from next.config
    if (Component.pageConfig) {
      pageConfig = {           // merge page configs with child component.
        ...pageConfig,
        ...Component.pageConfig
      };
    }

    // store ops.

    const { req } = ctx;
    const store = req ? new Store() : window.store;

    // const store = typeof window !== 'undefined' && !window.store ? new Store() : window.store;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ...ctx, store });   // get props of the child component.
    }
    let storeData;
    /*if (req) { // only first ssr.
      //auth operations
      const { auth } = pageConfig;
      if (auth) {
        store.language.changeLang('en');
        storeData = store.export();
        const { res } = ctx;
        res.writeHead(302, {
          location: getURL('about'),
        });
        console.log('reqq');
        res.end();
      }
    }*/

    storeData = req ? store.export() : null; /// sadece ilk ssr için.!.!.!

    return { storeData, pageConfig, pageProps };

  }

  public store: Store;
  constructor(props: any) {
    super(props);

    this.store = new Store();


    const { storeData } = props;
    if (storeData) {    // server side daki değişikliği inject etmek için
      this.store.import(storeData);
    }
    if (typeof window !== 'undefined' && !window.store) {
      window.store = this.store;
    }

  }

  render() {
    const { Component, pageProps, pageConfig, } = this.props;
    const { layout, header, footer } = pageConfig;

    return (
      <Container>
        <Provider store={this.store}>
          <>
            <Head>
              <title>Hello World!</title>
            </Head>
            <div className="container-fluid d-flex flex-column justify-content-between h-100 min-vh-100">
              {
                layout ?
                  <>
                    {header && <h1 className=" text-center">HEADER</h1>}
                    <Component {...pageProps} />
                    {footer && <h1 className=" text-center">FOOTER</h1>}
                  </>
                  :
                  <Component {...pageProps} />
              }
            </div>
          </>
        </Provider>
      </Container>

    );
  }

}



NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', NProgress.start);
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
