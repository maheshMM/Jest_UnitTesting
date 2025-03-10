import React, { useState } from 'react';

import Notes from './Components/Notes';

function App() {

  const options = ['No Caller 1', 'No Caller 2', 'No Caller 3', 'No Caller 4'];

  // User data
  const inputValues = [
    { id: 'No Caller 1', name: 'vishu', age: 30, review:"absusive" },
    { id: 'No Caller 2', name: 'sainath', age: 35 },
    { id: 'No Caller 3', name: 'vani', age: 33 },
    { id: 'No Caller 4', name: 'vijaya', age: 32 },
  ];
  const [selected, setSelected] = useState(options[0]);
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <select onChange={(e) => setSelected(e.target.value)}>
        {options.map((o, i) => (
          <option key={i} value={o}>
            {o}{' '}
          </option>
        ))}
      </select>

      <div> {selected}</div>

      {selected === 'No Caller 2' ? (
        <div>
          <h1></h1>No Caller 2 is not authorixed in CA
        </div>
      ) : (
        <div>
          <div>{selected}</div>
        </div>
      )}

      <Notes data-testid="notes-component" selected={selected} inputValues={inputValues}></Notes>
    </div>
  );


}

export default App;
