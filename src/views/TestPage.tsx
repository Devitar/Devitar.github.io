import { Test, View } from "../components";

/** Contact me page. */
const ContactMe = (viewName: string) => (
  <View viewId={viewName} key={Math.random()} style={{ height: "100vh", width: "100vw" }}>
    <Test />
  </View>
);

/** Exports */

export default ContactMe;
