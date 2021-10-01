import { Components } from "packing-list-shared";
import React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import { makeStyles } from "@material-ui/core";
import { container } from "tsyringe";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

class ComponentsConcrete extends Components {
  get Text() {
    return () => {
      // const classes = useStyles();
      return null;
      // <Typography variant="h6" className={classes.title}>
      //   Home
      // </Typography>
    };
  }
}

container.register<Components>(Components, {
  useValue: new ComponentsConcrete()
});

export {};
