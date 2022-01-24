import { Divider, Text, View } from "../components";

/** Contact me page. */
const ContactMe = (viewName: string) => (
  <View viewId={viewName}>
    <Text fontSize={24} link="email">
      devin.curtis1210@gmail.com
    </Text>
    <Divider color="rgba(0,0,0,0.25)" />
    <Text fontSize={24} link="textMessage" newTab={false}>
      801-616-9275
    </Text>
    <Divider color="rgba(0,0,0,0.25)" />
    <Text fontSize={24} link mask="My Github">
      https://github.com/Devitar
    </Text>
    <Divider color="rgba(0,0,0,0.25)" />
    <Text fontSize={24} link mask="My LinkedIn">
      https://www.linkedin.com/in/devin-curtis/
    </Text>
  </View>
);

/** Exports */

export default ContactMe;
