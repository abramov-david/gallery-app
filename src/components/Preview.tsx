import React from "react";
import { useAppSelector } from "../app/hooks";
import styles from "./Preview.module.css";

export default function Preview() {
  const { preview } = useAppSelector((state) => state.getImgs);
  return (
    <>
      <p className={styles.preview__title}>Preview</p>
      <div className={styles.preview}>
        {preview.map((item) => (
          <div className={styles.preview__item} key={item.imgItem.name}>
            <img
              src={URL.createObjectURL(item.imgItem)}
              alt={`${item.imgItem.name}`}
            />
          </div>
        ))}
      </div>
    </>
  );
}
