import React, { FC } from 'react';
import { Link } from '../routes';
import { Provider, PropTypes } from 'mobx-react';


const Home: FC = () => (
  <div>
    <h2>Home Page</h2>
    <Link route='about'><a>About Page</a></Link>
    <Link route='todo'><a>Todo List Page</a></Link>
  </div>
);


export default Home;