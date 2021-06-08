import React from "react";
import { PDFDocument, View } from "../components";
import resume from "../assets/Resume.pdf";

/** Basic about me page. */
const AboutMe = () => {
  return (
    <View headerText="About Me" padding={24}>
      <PDFDocument pdf={resume} numberOfPages={2} showPageNumber />
    </View>
  );
};

/** Exports */

export default AboutMe;
