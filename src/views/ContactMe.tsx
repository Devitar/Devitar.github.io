import { Divider, Text, View } from "../components";

/** Contact me page. */
const ContactMe = () => (
  <View headerText="Contact Me">
    <Text fontSize={24} link="email" mask="Via Email">
      devin.curtis1210@gmail.com
    </Text>
    <Divider color="rgba(0,0,0,0.25)" />
    <Text fontSize={24} link="textMessage" mask="Via Phone" newTab={false}>
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
