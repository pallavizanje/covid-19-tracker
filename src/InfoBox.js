import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({title, cases, total}) {
    return (
        <Card className= "infoBox" >
             <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <h2 className="infoBox__cases">
        {cases}
        </h2>

        <Typography className="infoBox__total" color="textSecondary">
    {total}Total
        </Typography>
      </CardContent>
        </Card>
    );
}

export default InfoBox;
