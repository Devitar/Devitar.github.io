import { FlipCard, Grid, View } from "../components";
import { PROJECT_DATA } from "../assets/ProjectData";

/** The main page of the app. Shows my projects. */
const Portfolio = (viewName: string) => {
  return (
    <View viewId={viewName}>
      <Grid>
        {PROJECT_DATA.map((value, index) => (
          <FlipCard
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
