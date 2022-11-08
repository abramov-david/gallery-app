import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Cropper from "react-easy-crop";
import { Point } from "react-easy-crop/types";
import getCroppedImg from "../helpers/createCropedImg";
import { updateCurImage } from "../app/slices/imgsSlice";
import { dataUrlToFile } from "../helpers/baseToFile";
import { closeModal } from "../app/slices/modalSlice";

export interface imgItem {
  imgItem: File;
  id: number;
}

interface aspectItem {
  value: number;
  text: string;
}

interface imageBase {
  url: string;
  id: number;
}

interface CropProps {
  id: number;
  imageUrl: File;
  cropInit: {};
  zoomInit: number;
  aspectInit: aspectItem;
  onCancel: () => void;
}

export default function CropAndRotate({
  id,
  imageUrl,
  cropInit,
  zoomInit,
  aspectInit,
  onCancel,
}: CropProps) {
  const { curImg } = useAppSelector((state) => state.getImgs);
  const [curImgUrl, setCurImgUrl] = useState<imageBase>({ url: "", id: 0 });

  const aspectRations = [
    { value: 4 / 3, text: "4/3" },
    { value: 16 / 9, text: "16/9" },
    { value: 1 / 2, text: "1/2" },
  ];

  if (zoomInit == 0) {
    zoomInit = 1;
  }
  if (aspectInit == null) {
    aspectInit = aspectRations[0];
  }

  const [zoom, setZoom] = useState(zoomInit);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [aspect, setAspect] = useState(aspectInit);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    const file2Base64 = (file: File): Promise<string> => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString() || "");
        reader.onerror = (error) => reject(error);
      });
    };
    async function getCurImage() {
      const file = curImg[0].imgItem;
      const imageId = curImg[0].id;
      let res = await file2Base64(file);
      setCurImgUrl({ url: res, id: imageId });
    }
    getCurImage();
  }, []);

  const onCropChange = (crop: any) => {
    setCrop(crop);
  };
  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onAspectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseFloat(e.target.value);
    const ratio = aspectRations.find((ratio) => ratio.value == value);
    if (ratio) {
      setAspect(ratio);
    }
  };
  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCrop = async () => {
    const croppedImageUrl = await getCroppedImg(
      curImgUrl.url,
      croppedAreaPixels
    );
    const res = await dataUrlToFile(croppedImageUrl, curImg[0].imgItem.name);
    const newFuleImg = { id: curImg[0].id, imgItem: res };
    dispatch(updateCurImage(newFuleImg));
    dispatch(closeModal());
  };
  const onReset = () => {
    setZoom(1);
  };

  return (
    <div className="cropAndRotate">
      <div className="backdrop"></div>
      <div className="crop-container">
        <Cropper
          image={curImgUrl.url}
          aspect={aspect.value}
          zoom={zoom}
          crop={crop}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="controls">
        <div className="controls-upper-area">
          <input
            className="slider"
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onInput={(e: any) => {
              onZoomChange(e.target.value);
            }}
          />
          <select name="" id="" onChange={onAspectChange}>
            {aspectRations.map((ratio) => (
              <option
                key={ratio.text}
                value={ratio.value}
                selected={ratio.value === aspect.value}
              >
                {ratio.text}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="button-area">
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onReset}>Reset</button>
        <button onClick={onCrop}>Crop</button>
      </div>
    </div>
  );
}
