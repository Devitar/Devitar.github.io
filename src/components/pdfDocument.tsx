import { useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styled from "styled-components";

/** Config */

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
};

/** Displays a PDF. */
const PDFDocument = ({
  numberOfPages = 1,
  pdf,
  maxWidth = 850,
  widthAlpha = 0.75,
  showPageNumber = false,
  showPageBorder = true,
}: Props) => {
  const { width } = usePDFWidth(widthAlpha, maxWidth);

  /** Creates an array of react-pdf Document elements. */
  const renderDocuments = useCallback(
    () =>
      Array(numberOfPages)
        .fill(1)
        .map((_, i) => (
          <Container showBorder={showPageBorder} key={i}>
            {showPageNumber && <PageText>{`Page ${i + 1}`}</PageText>}
            <Document file={pdf} onLoadError={console.log}>
              <Page pageNumber={i + 1} width={width} />
            </Document>
          </Container>
        )),
    [numberOfPages, pdf, showPageBorder, showPageNumber, width]
  );

  return <>{renderDocuments()}</>;
};

/** Styles */

const Container = styled.div<{ showBorder: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border: ${({ showBorder }) =>
    showBorder ? "1px solid rgba(0, 0, 0, 0.25)" : undefined};
`;
const PageText = styled.div`
  padding: 4px;
  background-color: #e4e4e4;
`;

/** Hooks */

/** Converts an alpha number into a pixel width measurement of the screen's width. */
const usePDFWidth = (widthAlpha: number, maxWidth: number) => {
  const screenWidth = window.innerWidth;
  const remainder = 1 - widthAlpha;
  const width = Math.min(screenWidth - screenWidth * remainder, maxWidth);

  return { width };
};

/** Exports */

export default PDFDocument;
