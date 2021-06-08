import { ResumeLinkCard, View } from "../components";
import { PROJECT_DATA } from "../assets/ProjectData";

/** The main page of the app. */
const Portfolio = () => {
  return (
    <View headerText="Portfolio">
      {PROJECT_DATA.map((value, index) => (
        <div className="column is-one-third" key={index}>
          <ResumeLinkCard
            title={value.title}
            subtitle={value.subtitle}
            subtitle2={value.subtitle2}
            url={value.url}
            image={value.image}
          />
        </div>
      ))}
    </View>
  );
};

/** Exports */

export default Portfolio;
