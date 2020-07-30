import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    left: "0",
    top: "0",
    bottom: "0",
    right: "0",
    background: "#fafafa",
    zIndex: "2"
  },
  progress: {
    margin: theme.spacing(2)
  }
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.progress} />
    </div>
  );
}
