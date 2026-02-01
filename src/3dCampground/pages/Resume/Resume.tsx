import './Resume.css';
import '../Pages.css';
import { PDF } from '~/components';
import resume from '~/assets/Devin_Curtis_Resume_2026_Redacted.pdf';
import PaperEffect from '~/3dCampground/subcomponents/UI/PaperEffect';

const Resume = () => {
  return (
    <div className='page-wrapper resume-page'>
      <h2 className='header'>HISTORY</h2>
      <PaperEffect paperBackground={false}>
        <div className='resume-scroll-container'>
          <PDF pdf={resume} numberOfPages={2} />
        </div>
      </PaperEffect>
    </div>
  );
};

export default Resume;
