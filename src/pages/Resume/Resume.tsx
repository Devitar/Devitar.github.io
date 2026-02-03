import './Resume.css';
import '../Pages.css';
import { PDF, PaperEffect } from '~/components';
import resume from '~/assets/Devin_Curtis_Resume_2026_Redacted.pdf';

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
