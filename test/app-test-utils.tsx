import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, RenderOptions } from 'react-testing-library';
import { Omit } from '../src/types/global';

const customRender = (
  ui: React.ReactNode,
  options?: Omit<RenderOptions, 'queries'>
) => render(<BrowserRouter>{ui}</BrowserRouter>, options);

export * from 'react-testing-library';
export { customRender as render };
