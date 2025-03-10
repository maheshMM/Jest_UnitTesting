import React from 'react';

export default function Notes({ selected, inputValues }) {
  const selectedItem = inputValues.find(
    (item) => item.id.trim().toLowerCase() === selected?.trim().toLowerCase()
  );
  return (
    <div >
      {selectedItem.review?<h1>Review-NOtes</h1>:<h1>Notes</h1>}

      {selectedItem.id==="No Caller 2"?(<div>
        <h1>No Caller 2 is not autherized</h1>
      </div>):
        (
        <div><input
          type="type"
          value={selectedItem ? selectedItem.name : ''}
          readonly
        />
         <textarea placeholder={selectedItem ? selectedItem.review : ''}></textarea>
        </div>
        )
      }
      <button>Save Notes</button>
    </div>
  );
}