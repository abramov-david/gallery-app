import React, { useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { closeModal } from "./app/slices/modalSlice";
import CropAndRotate from "./components/CropAndRotate";
import FormImgs from "./components/FormImgs";
import Gallery from "./components/Gallery";

const InitData = {
  id: 0,
  cropInit: {},
  zoomInit: 0,
  aspectInit: { value: 4 / 3, text: "4/3" },
};

function App() {
  const [selectedImg, setSelectedImg] = useState(InitData);
  const { isModal } = useAppSelector((state) => state.modal);
  const { curImg } = useAppSelector((state) => state.getImgs);
  const dispatch = useAppDispatch();
  const onCancel = () => {
    dispatch(closeModal());
  };
  return (
    <div className="App">
      <div className="maintitle">
        <h1>Gallery App</h1>
        <p>Welcome to the stunning image app</p>
      </div>
      <FormImgs />
      <Gallery />
      {isModal && (
        <CropAndRotate
          id={selectedImg.id}
          imageUrl={curImg[0].imgItem}
          cropInit={selectedImg.cropInit}
          zoomInit={selectedImg.zoomInit}
          aspectInit={selectedImg.aspectInit}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}

export default App;
