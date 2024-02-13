import { PDF, View } from "../components";
import resume from "../assets/Resume-Devin-Curtis-02-2024.pdf";

/** Page containing my resume. */
const Resume = (viewName: string) => {
  const isSmall = window.innerWidth < 600;
  return (
    <View viewId={viewName} key={Math.random()} style={{ paddingLeft: 170 }}>
      {isSmall ? (
        <PDF pdf={resume} numberOfPages={2} />
      ) : (
        <PDF pdf={resume} numberOfPages={2} widthAlpha={0.65} />
      )}
    </View>
  );
};

/** Exports */

export default Resume;
