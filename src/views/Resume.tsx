import { PDFDocument, View } from "../components";
import resume from "../assets/Resume-Devin-Curtis.pdf";

/** Page containing my resume. */
const Resume = () => {
  const isSmall = window.innerWidth < 600;
  return(
    <View>
      {isSmall
        ? (<PDFDocument pdf={resume} numberOfPages={2} showPageNumber />)
        : (<PDFDocument row pdf={resume} numberOfPages={2} showPageNumber widthAlpha={0.49} />)
      }
      
    </View>
  );
}

/** Exports */

export default Resume;
