import './App.css';
import MyInfo from './components/MyInfo/MyInfo';
import SearchBar from './components/SearchBar/SearchBar';
import ImageResults from './components/ImageResults/ImageResults';
import CanvasEditor from './components/CanvasEditor/CanvasEditor';
import DownloadButton from './components/DownloadButton/DownloadButton';
import { useState, useRef } from "react";

function App() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const canvasInstance = useRef(null);

  return (
    <div className="app container mx-auto px-16">

      <MyInfo />

      <h1 className="text-center 2xl:text-3xl py-4">Image Editor App</h1>
      <SearchBar setImages={setImages} />
      <ImageResults images={images} setSelectedImage={setSelectedImage} />
      {selectedImage && (
        <>
          <CanvasEditor
            selectedImage={selectedImage}
            setCanvasInstance={(instance) => {
              canvasInstance.current = instance;
              console.log("Canvas instance set in App:", canvasInstance.current); // Verify if the instance is set
            }}
          />
          <DownloadButton canvasInstance={canvasInstance} />
        </>
      )}
    </div>
  );
}

export default App;
