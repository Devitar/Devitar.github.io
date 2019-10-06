import React, {Component} from 'react';
import {Document, Page, pdfjs} from 'react-pdf';

//Styles
import 'react-pdf/dist/Page/AnnotationLayer.css';
import '../scss/resumePage.scss';

//Components

const resume = require('../../assets/pdf/Resume.pdf');
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class ResumePage extends Component {

    render() {
        let rwidth = Math.floor(window.innerWidth * 0.4);
        if (rwidth < 400) {
            rwidth = 400;
        }

        return (
            <div className="container">
                <div className="columns is-multiline">
                    <div className="column is-one-half resumeContainer">
                        <Document file={resume} onLoadError={console.error}>
                            <p>Page 1</p>
                            <Page pageNumber={1} width={rwidth}/>
                        </Document>
                    </div>
                    <div className="column is-one-half resumeContainer">
                        <Document file={resume} onLoadError={console.error}>
                            <p>Page 2</p>
                            <Page pageNumber={2} width={rwidth}/>
                        </Document>
                    </div>
                </div>
            </div>
        );
    }
}