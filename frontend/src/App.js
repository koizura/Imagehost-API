import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import ButtonAppBar from "./components/ButtonAppBar";
import ImageList from "./components/ImageList";
import UploadForm from "./components/UploadForm";

function App() {
  const [images, setImages] = useState([]);

  function refresh() {
    axios.get(`http://localhost:3005/photos/all`).then((res) => {
      console.log(res.data);
      setImages(res.data);
    });
  }

  useEffect(() => {
    refresh();
    document.title = "ImageHost API 2";
  }, []);

  return (
    <div className="App">
      <ButtonAppBar></ButtonAppBar>
      <UploadForm refresh={refresh}></UploadForm>
      <ImageList images={images} refresh={refresh}></ImageList>
    </div>
  );
}

export default App;
