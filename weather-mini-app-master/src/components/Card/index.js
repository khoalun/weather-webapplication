import React from "react";
// import moment from "moment";
import forEach from "lodash/forEach";

//compoent layout
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 50
  },
  temp: {
    textAlign: "center"
  }
});

export default function MediaCard({
  item,
  city,
  units,
  index = 0,
  handelSetIndex = () => {}
}) {
  const classes = useStyles();

  const temp = () => {
    let outPut = 0;
    const { temlist } = item;
    if (temlist) {
      forEach(temlist, e => {
        outPut = outPut + e.main.temp;
      });
      outPut = Math.floor(outPut / temlist.length);
    }
    return outPut;
  };

  return (
    <Card className={classes.card}>
      <CardActionArea
        onClick={() => {
          handelSetIndex(index);
        }}
      >
        <CardHeader title={city.name || ""} className={classes.temp} />
        <CardMedia className={classes.media} title="Contemplative Reptile">
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.temp}
          >
            <span>
              {temp()} {units === "metric" ? "ºC" : "ºF"}
            </span>
          </Typography>
        </CardMedia>
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.temp}
          >
            Date: {item.date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
