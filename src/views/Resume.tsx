import { PDF, View } from "../components";
import resume from "../assets/Resume-Devin-Curtis.pdf";

/** Page containing my resume. */
const Resume = (viewName: string) => {
  const isSmall = window.innerWidth < 600;
  return(
    <View viewId={viewName}>
      {isSmall
        ? (<PDF pdf={resume} numberOfPages={1} />)
        : (<PDF row pdf={resume} numberOfPages={1} widthAlpha={0.49} />)
      }
      
    </View>
  );
}

/** Exports */

export default Resume;
