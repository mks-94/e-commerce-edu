import React, { Fragment } from "react";
import CourseSlider from "../components/courseSlider/CourseSlider";
import CtaTop from "../components/ctaTop/CtaTop";
import Header from "../components/header/Header";

const Landing = () => {
  return (
    <Fragment>
      <Header />
      <CtaTop />
      <CourseSlider />
    </Fragment>
  );
};
export default Landing;
