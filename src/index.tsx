import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

const Start = () => <div>Start</div>;
const Application = hot(Start);

const root = document.getElementById('root') as HTMLElement;

ReactDOM.render(<Application />, root);
