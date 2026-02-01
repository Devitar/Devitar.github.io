import { useCallback, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './PDF.css';

/** Config */

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

/** Types */

type Props = {
  /** How many pages from the PDF should be displayed. */
  numberOfPages?: number;
  /** The PDF file to be displayed. Import it as a module: import PDF from "{filepath}/{file}.pdf" */
  pdf: any;
  /** Maximum width of the PDF in pixels. If not provided, PDF takes full container width. */
  maxWidth?: number;
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
  maxWidth,
  showPageNumber = false,
  showPageBorder = true,
  row = false,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setWidth(maxWidth ? Math.min(containerWidth, maxWidth) : containerWidth);
      }
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [maxWidth]);

  /** Creates an array of react-pdf Document elements. */
  const renderDocuments = useCallback(
    () => (
      <>
        {width > 0 &&
          Array(numberOfPages)
            .fill(1)
            .map((_, i) => (
              <div className={`pdf-container ${showPageBorder ? 'pdf-with-border' : ''}`} key={i}>
                {showPageNumber && <div className="pdf-page-text">{`Page ${i + 1}`}</div>}
                <Document file={pdf} onLoadError={console.error}>
                  <Page pageNumber={i + 1} width={width} />
                </Document>
              </div>
            ))}
      </>
    ),
    [numberOfPages, pdf, showPageBorder, showPageNumber, width]
  );

  return (
    <div ref={containerRef} className={`pdf-wrapper ${row ? 'pdf-row' : 'pdf-column'}`}>
      {renderDocuments()}
    </div>
  );
};

/** Exports */

export default PDF;
