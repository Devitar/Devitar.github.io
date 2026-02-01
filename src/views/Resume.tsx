import { PDF, View } from '~/components';
import resume from '~/assets/Devin_Curtis_Resume_2026_Redacted.pdf';

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
