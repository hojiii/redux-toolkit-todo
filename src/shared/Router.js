import React from 'react'
import Home from '../page/Home';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Detail from '../page/Detail';
import Form from '../page/Form';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail/:id" element={<Detail/>} />
        <Route path="form" element={<Form />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router