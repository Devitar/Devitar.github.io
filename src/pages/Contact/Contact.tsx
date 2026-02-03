import './Contact.css';
import '../Pages.css';

import UtahMap from '~/assets/images/utah_elevation_map.webp';
import { Divider, Text } from '~/components';

const Contact = () => {
  return (
    <div className='page-wrapper contact-page'>
      <h2 className='header'>ELEVATION</h2>
      <img src={UtahMap} alt='Utah Elevation Map' className='map' />
      <div className='links'>
        <Text fontSize={24} link='email'>
          devin.curtis1210@gmail.com
        </Text>
        <Divider color='rgba(0,0,0,0.25)' />
        <Text fontSize={24} link mask='My Github'>
          https://github.com/Devitar
        </Text>
        <Divider color='rgba(0,0,0,0.25)' />
        <Text fontSize={24} link mask='My LinkedIn'>
          https://www.linkedin.com/in/devin-curtis/
        </Text>
      </div>
    </div>
  );
};

export default Contact;
