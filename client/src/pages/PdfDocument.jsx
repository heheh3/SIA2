import React from 'react';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

const PdfDocument = ({ data }) => (
  <Document>
    <Page style={styles.page} >
        {data.map((item, index) => (
          <div>
             
          </div>
         
        ))}
    </Page>
  </Document>
);

export default PdfDocument;
