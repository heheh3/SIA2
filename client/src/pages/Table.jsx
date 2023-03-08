import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Table() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // make a GET request to the API route
    axios.get('/api/data')
      .then(response => {
        // set the data in state
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleEdit = (index, field, value) => {
    // create a copy of the data array
    const newData = [...data];

    // update the value of the specified field at the specified index
    newData[index][field] = value;

    // set the data in state
    setData(newData);
  };

  const handleSave = () => {
    // make a POST request to the API route
    axios.post('/api/data', data)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="date"
                  value={row.date}
                  onChange={event => handleEdit(index, 'date', event.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.description}
                  onChange={event => handleEdit(index, 'description', event.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.amount}
                  onChange={event => handleEdit(index, 'amount', event.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default Table;