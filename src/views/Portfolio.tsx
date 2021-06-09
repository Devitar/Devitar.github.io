import { Grid, ResumeLinkCard, View } from "../components";
import { PROJECT_DATA } from "../assets/ProjectData";

/** The main page of the app. */
const Portfolio = () => {
  return (
    <View headerText="Portfolio">
      <Grid>
        {PROJECT_DATA.map((value, index) => (
          <ResumeLinkCard
            title={value.title}
            subtitle={value.subtitle}
            subtitle2={value.subtitle2}
            url={value.url}
            image={value.image}
            key={index}
          />
        ))}
      </Grid>
    </View>
  );
};

/** Exports */

export default Portfolio;
