import { useState } from 'react';
import './App.css';
import Form from './Form';
import StudentsTable from './StudentsTable';

function App() {
  const [selectedId,setSelectedId] = useState(0);
  return (
    <div className="App">
      <h1>Student Registration</h1>
      <Form selectedId={selectedId} setSelectedId={setSelectedId}/>
      <StudentsTable setSelectedId={setSelectedId}/>
    </div>
  );
}

export default App;
