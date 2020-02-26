import { NextPage } from 'next';
import React from 'react';
import { inject, observer } from 'mobx-react';
import Store from '../stores';
import { Link } from '../routes';
import IPageConfig from '../interfaces/PageConfig';
import queryString from 'query-string';

type Props = {
  age: number;
  store?: Store;
}

type INextPage<P> = NextPage<P> & {
  pageConfig?: IPageConfig //whatever type it actually is ===> any. olmalı
}


const About: INextPage<Props> = (props): JSX.Element => {

  const { store } = props;
  return (
    <div>
      <h2>About Page</h2>
      <Link route='home'><a>home page</a></Link>
    </div>
  );
};
About.getInitialProps = async (ctx): Promise<Props> => {  // getInitialProps works on only pages folder, not other components.
  return {
    age: 12
  };
};

About.pageConfig = { auth: false };

export default inject('store')(observer(About));