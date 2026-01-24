import { Test, View } from "../components";

/** Contact me page. */
const ContactMe = (viewName: string) => (
  <View viewId={viewName} key={Math.random()}>
    {/* <Test /> */}
  </View>
);

/** Exports */

export default ContactMe;
