import { Button, Input, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
export default function UploadForm(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [fileName, setFileName] = useState("");
  function reset() {
    setSelectedImage(null);
    setDescription("");
    setTitle("");
    setFileName("");
  }
  async function onSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("image", selectedImage, fileName);
      formData.append("title", title);
      formData.append("description", description);

      axios
        .post("http://localhost:3005/photos/upload", formData)
        .then((res) => {
          console.log(res);
          setTimeout(props.refresh, 100);
        });
      reset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Paper elevation={3} style={{ padding: 30, margin: 30 }}>
      <div style={{ maxWidth: "70", minWidth: "50", margin: "auto" }}>
        {!selectedImage && (
          <Paper elevation={0}>
            <Typography variant="h4">Upload an image to the server</Typography>
            <Input
              type="file"
              name="myImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
                setFileName(event.target.files[0].name);
              }}
            ></Input>
          </Paper>
        )}
        {selectedImage && (
          <div>
            <Typography variant="h4">Fill in details for upload</Typography>
            <Paper
              elevation={1}
              style={{
                maxWidth: 250,
                minWidth: 200,
                width: "80%",
                margin: "auto",
                marginTop: 10,
                padding: 20,
                paddingBottom: 5,
              }}
            >
              <img
                alt="uploaded"
                style={{ width: "100%" }}
                src={URL.createObjectURL(selectedImage)}
              />
              <Typography variant="caption" color="text.secondary">
                {fileName}
              </Typography>
            </Paper>
            <br />
          </div>
        )}

        {selectedImage && (
          <form onSubmit={onSubmit}>
            <input
              htmlFor="ftitle"
              type="text"
              placeholder="Title"
              style={{ maxWidth: 300, width: "80%" }}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <br></br>
            <textarea
              htmlFor="fdescription"
              placeholder="Description"
              style={{
                resize: "none",
                maxWidth: 300,
                width: "80%",
                height: 100,
              }}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <br></br>
            <br></br>
            <Button variant="outlined" onClick={reset}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Upload
            </Button>
          </form>
        )}
      </div>
    </Paper>
  );
}
