import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text>Date</Text>
        {data.map((item, index) => (
          <Text key={index}>{item.b_date}</Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text>Time</Text>
        {data.map((item, index) => (
          <Text key={index}>{item.b_time}</Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text>Procedure</Text>
        {data.map((item, index) => (
          <Text key={index}>{item.b_procedure}</Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default PdfDocument;
