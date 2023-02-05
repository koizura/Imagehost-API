import { Box } from "@mui/material";
import { Grid } from "@mui/material";

import MediaCard from "./MediaCard";

export default function ImageList(props) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px",
      }}
    >
      <Box
        sx={{ flexGrow: 1 }}
        style={{
          maxWidth: "70%",
        }}
      >
        <Grid container spacing={2}>
          {props.images.map((item) => (
            <Grid item xs={4}>
              <MediaCard
                title={item.title}
                description={item.description}
                filename={item.filename}
                refresh={props.refresh}
              ></MediaCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
