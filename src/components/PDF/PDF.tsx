import { useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "./PDF.css";

/** Config */

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFWidth = window.innerWidth < 600 ? 1 : 0.75;

/** Types */

type Props = {
  /** How many pages from the PDF should be displayed. */
  numberOfPages?: number;
  /** The PDF file to be displayed. Import it as a module: import PDF from "{filepath}/{file}.pdf" */
  pdf: any;
  /** Maximum width of the PDF in pixels. Default: 850 */
  maxWidth?: number;
  /** The percent of the width of the screen the PDF will be sized to. 0..1 Default: 0.75 */
  widthAlpha?: number;
  /** Shows page number above the PDF page. Default: false */
  showPageNumber?: boolean;
  /** Shows a border around each page of the PDF. Default: true */
  showPageBorder?: boolean;
  /** Shows PDF pages in a row instead of column. */
  row?: boolean;
};

/** Displays a PDF. */
const PDF = ({
  numberOfPages = 1,
  pdf,
  maxWidth = 850,
  widthAlpha = PDFWidth,
  showPageNumber = false,
  showPageBorder = true,
  row = false,
}: Props) => {
  const { width } = usePDFWidth(widthAlpha, maxWidth);

  /** Creates an array of react-pdf Document elements. */
  const renderDocuments = useCallback(
    () =>
    <div className={`pdf-wrapper ${row ? "pdf-row" : "pdf-column"}`}>
      {Array(numberOfPages)
        .fill(1)
        .map((_, i) => (
          <div className={`pdf-container ${showPageBorder ? "pdf-with-border" : ""}`} key={i}>
            {showPageNumber && <div className="pdf-page-text">{`Page ${i + 1}`}</div>}
            <Document file={pdf} onLoadError={console.error}>
              <Page pageNumber={i + 1} width={width} />
            </Document>
          </div>
        ))}
        </div>,
    [numberOfPages, pdf, row, showPageBorder, showPageNumber, width]
  );

  return <>{renderDocuments()}</>;
};

/** Hooks */

/** Converts an alpha number into a pixel width measurement of the screen's width. */
const usePDFWidth = (widthAlpha: number, maxWidth: number) => {
  const screenWidth = window.innerWidth < 1350 ? window.innerWidth : 1350;
  const remainder = 1 - widthAlpha;
  const width = Math.min(screenWidth - screenWidth * remainder, maxWidth);

  return { width };
};

/** Exports */

export default PDF;
