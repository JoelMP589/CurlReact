import React from 'react'
import { PDFDownloadLink, Page, Text, Document, StyleSheet } from '@react-pdf/renderer';

const MyDocument = (props) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Pruebas de Api REST</Text>
            <Text style={styles.text}>{`Rest: ${JSON.stringify(props.respuesta.config.url || '')}`}</Text>
            <Text style={styles.text}>{`Estatus de la petición: ${JSON.stringify(props.respuesta.status || '')}`}</Text>
            <Text style={styles.text}>{`Headers: ${JSON.stringify(props.respuesta.headers || '')}`}</Text>
            <Text style={styles.text}>{`Método: ${JSON.stringify(props.respuesta.config.method || '')}`}</Text>
            <Text style={styles.text}>{`Datos recibidos: ${JSON.stringify(props.respuesta.data || '')}`}</Text>
        </Page>
    </Document>
);

export const GenerarPDF = (props) => (
    <PDFDownloadLink document={<MyDocument respuesta={props.objectTerminal} />} fileName="somename.pdf">
        {
            ({ loading }) => loading ? 'Cargando' : 'Descargar última petición'
        }
    </PDFDownloadLink>
)


// Create styles
const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
    },
});

