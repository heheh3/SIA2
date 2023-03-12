import React, { useState } from 'react';
import axios from 'axios';
import PdfDocument from './PdfDocument';

const PrintButton = () => {
  const [data, setData] = useState([]);

  const fetchMySqlData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/appointment/get');
      setData(response.data);
      printPdf();
    } catch (error) {
      console.error(error);
    }
  };

  const printPdf = () => {
    const pdfWindow = window.open("http://localhost:3000/reminder", "", "popup");
    pdfWindow.document.write('<html><head><title>TOOTHFULLY YOURS </title></head><body>');
    pdfWindow.document.write(document.getElementById('pdf-content').innerHTML);
    pdfWindow.document.write('</body></html>');
    pdfWindow.document.close();
    pdfWindow.print();
  };

  return (
    <div>
      <button onClick={fetchMySqlData} style={{padding:"8px", cursor: "pointer"}}>Download</button>
      <div id="pdf-content" style={{ display: 'none' }}>
        {data.length > 0 && <PdfDocument data={data} />}
      </div>
    </div>
  );
};

export default PrintButton;
