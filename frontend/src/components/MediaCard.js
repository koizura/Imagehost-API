import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import axios from "axios";

export default function MediaCard(props) {
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(props.description);
  const [title, setTitle] = useState(props.title);
  const [deleteWarning, setDeleteWarning] = useState(false);
  async function onSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);

      axios
        .put(`http://localhost:3005/photos/${props.filename}`, formData)
        .then((res) => {
          console.log(res);
          setTimeout(props.refresh, 500);
        });
      reset();
    } catch (error) {
      console.log(error);
    }
  }
  function deleteFile() {
    try {
      axios
        .delete(`http://localhost:3005/photos/${props.filename}`)
        .then((res) => {
          console.log(res);
          setTimeout(props.refresh, 500);
          reset();
        });
    } catch (error) {
      console.log(error);
    }
  }
  function reset() {
    setEditing(false);
    setDeleteWarning(false);
  }
  return (
    <Card sx={{ maxWidth: 345, minWidth: 300 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`http://localhost:3005/uploads/min.${props.filename}`}
        title={props.filename}
      />
      {!editing && (
        <CardContent>
          <Typography variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="subtitle1">{props.filename}</Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      )}
      {editing && (
        <CardContent>
          <form onSubmit={onSubmit}>
            <input
              htmlFor="ftitle"
              type="text"
              placeholder="Title"
              value={title}
              style={{ maxWidth: 280, width: "80%" }}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <br></br>
            <textarea
              htmlFor="fdescription"
              placeholder="Description"
              value={description}
              style={{
                resize: "none",
                maxWidth: 280,
                width: "80%",
                height: 50,
              }}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <br></br>
            <br></br>
            <Button variant="outlined" onClick={reset}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Update
            </Button>
            {!deleteWarning && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => setDeleteWarning(true)}
              >
                Delete
              </Button>
            )}
            {deleteWarning && (
              <Button variant="contained" color="error" onClick={deleteFile}>
                Confirm?
              </Button>
            )}
          </form>
        </CardContent>
      )}
      {!editing && (
        <CardActions>
          <Button size="small" onClick={() => setEditing(true)}>
            Edit
          </Button>
          {/* <Button size="small">Learn More</Button> */}
        </CardActions>
      )}
    </Card>
  );
}
