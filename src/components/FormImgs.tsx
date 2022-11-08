import React, { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Preview from "./Preview";
import {
  addToGallery,
  cleanPreview,
  previewImgs,
} from "../app/slices/imgsSlice";
import styles from "./FormImgs.module.css";

export default function FormImgs() {
  const { preview } = useAppSelector((state) => state.getImgs);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    const res = [];
    for (const item of chosenFiles) {
      const imgId = Math.random();
      res.push({ imgItem: item, id: imgId });
    }
    dispatch(previewImgs(res));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addToGallery(preview));
    dispatch(cleanPreview());
    console.log(preview);
  };

  const dispatch = useAppDispatch();

  return (
    <div className={styles.form}>
      <p>Add an amazing photo from your device to your gallery</p>
      <form action="#" onSubmit={submitHandler}>
        <div className={styles.selectBtn}>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={changeHandler}
            title="Select images"
            id="select"
            style={{ display: "none" }}
          />
          <label htmlFor="select">Select file</label>
        </div>

        {preview.length ? (
          <>
            <Preview />
            <button type="submit">Add to gallery</button>
          </>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}
