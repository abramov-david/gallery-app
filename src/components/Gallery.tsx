import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { showCurImg } from "../app/slices/imgsSlice";
import { openModal } from "../app/slices/modalSlice";
import styles from "./Gallery.module.css";

export default function Gallery() {
  const { gallery, curImg } = useAppSelector((state) => state.getImgs);
  const { isModal } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const clickHandler = (e: any) => {
    dispatch(showCurImg(parseFloat(e.target.id)));
    dispatch(openModal());
  };
  return (
    <div className={styles.gallery}>
      {gallery.length ? (
        <>
          <h2>Your Gallery</h2>
          <div className={styles.gallery__container}>
            {gallery.map((item) => (
              <div className={styles.imgWrapper} key={item.imgItem.name}>
                <img
                  src={URL.createObjectURL(item.imgItem)}
                  alt={`${item.imgItem.name}`}
                  id={`${item.id}`}
                  onClick={clickHandler}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No gallery yet</p>
      )}
    </div>
  );
}
