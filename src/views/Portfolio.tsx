import { Grid, ResumeLinkCard, View } from "../components";
import { PROJECT_DATA } from "../assets/ProjectData";

/** The main page of the app. Shows my projects. */
const Portfolio = () => {
  return (
    <View>
      <Grid>
        {PROJECT_DATA.map((value, index) => (
          <ResumeLinkCard
            title={value.title}
            subtitle={value.subtitle}
            subtitle2={value.subtitle2}
            url={value.url}
            image={value.image}
            imgSize={value.imgWidth}
            key={index}
          />
        ))}
      </Grid>
    </View>
  );
};

/** Exports */

export default Portfolio;
