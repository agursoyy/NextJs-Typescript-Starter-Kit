import React, { useState, useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import IPageConfig from '../interfaces/PageConfig';
import { Link } from '../routes';
import { inject, observer } from 'mobx-react';
import Store from '../stores';



type IProps = {
  store?: Store  // add store type to Iprops as optional.
  age: number,
  todos?: any
};

type INextPage<P> = NextPage<P> & {  //<P> props generic.
  pageConfig?: IPageConfig //whatever type it actually is ===> any. olmalı
}

interface INextPageContext extends NextPageContext {
  store: Store
}

const ToDo: INextPage<IProps> = (props) => {

  const [count, setCount] = useState(0);

  const { api } = props.store;
  console.log(props.store.todolist.Todos);
  return (
    <div>
      <h2>ToDo List from remote restful api</h2>
      <span>{count}</span>
      <Link route='home'>home page</Link>
    </div>
  );
};

ToDo.getInitialProps = async (ctx: INextPageContext): Promise<IProps> => {
  const { req, store } = ctx;
  await store.todolist.fetchTodos();
  return { age: 12 };
};

ToDo.pageConfig = { auth: false };




export default inject('store')(observer(ToDo));