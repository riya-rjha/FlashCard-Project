// App.jsx
import React from 'react';
import Heading from './Components/Heading';
import AddCards from './Pages/AddCards.jsx';
import DeleteCards from './Pages/DeleteCards.jsx';
import EditCards from './Pages/EditCards.jsx';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Heading />} />
      <Route path='/cards/create' element={<AddCards />} />
      <Route path='/cards/delete/:id' element={<DeleteCards />} />
      <Route path='/cards/edit/:id' element={<EditCards />} />
    </Routes>
  )
}

export default App