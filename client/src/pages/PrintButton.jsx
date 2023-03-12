import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DataPDF from './AppointmentHistory';

const PrintButton = ({ data }) => (
  <PDFDownloadLink document={<DataPDF data={data} />} fileName="data.pdf">
    {({ blob, url, loading, error }) =>
      loading ? 'Loading document...' : 'Download PDF'
    }
  </PDFDownloadLink>
);

export default PrintButton;