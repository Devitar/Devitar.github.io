import { PDFDocument, View } from "../components";
import resume from "../assets/Resume.pdf";

/** Basic about me page. */
const Resume = () => (
  <View headerText="About Me" paddingX={24}>
    <PDFDocument pdf={resume} numberOfPages={2} showPageNumber />
  </View>
);

/** Exports */

export default Resume;
