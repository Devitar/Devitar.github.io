import { Divider, Text, View } from '~/components';

/** Contact me page. */
const ContactMe = (viewName: string) => (
  <View viewId={viewName} key={Math.random()}>
    <Text fontSize={24} link="email" color="#fff">
      devin.curtis1210@gmail.com
    </Text>
    <Divider color="rgba(0,0,0,0.25)" />
    <Text fontSize={24} link mask="My Github" color="#fff">
      https://github.com/Devitar
    </Text>
    <Divider color="rgba(0,0,0,0.25)" />
    <Text fontSize={24} link mask="My LinkedIn" color="#fff">
      https://www.linkedin.com/in/devin-curtis/
    </Text>
  </View>
);

/** Exports */

export default ContactMe;
