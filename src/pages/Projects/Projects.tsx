import './Projects.css';
import '../Pages.css';
import { useMemo } from 'react';

import PROJECT_DATA from '~/assets/ProjectData.ts';

const Projects = () => {
  const projects = useMemo(
    () =>
      PROJECT_DATA.map((project, index) => (
        <a
          key={index}
          className='projects-entry'
          href={project.url}
          target='_blank'
          rel='noopener noreferrer'
        >
          <div className='projects-chapter-row'>
            <h3 className='projects-chapter'>{project.title}</h3>
            <span className='projects-dots' />
            <span className='projects-page-number'>{String(index + 1).padStart(2, '0')}</span>
          </div>
          <ul>
            <li>
              <p className='projects-subtitle'>
                <span className='page-underline'>{project.platform}</span>
                {' - '}
                {project.technologies}
              </p>
            </li>
            <li>
              <p className='projects-subtitle'>{project.subtitle}</p>
            </li>
          </ul>
        </a>
      )),
    []
  );

  return (
    <div className='page-wrapper projects-page'>
      <h2 className='page-header'>TABLE OF CONTENTS</h2>
      {projects}
    </div>
  );
};

export default Projects;
