import { FC } from "react";
import styles from "./FileIcon.module.scss";
import { URL_BACKEND } from "../../utils/constants";
import { Link } from "react-router-dom";
import pdf_icon from "../../images/icons/pdf.svg";
import word_icon from "../../images/icons/Word.svg";
import excel_icon from "../../images/icons/excel_logo.svg";
import image_icon from "../../images/icons/img_icon.svg";

type TFile = {
  name: string;
  url: string;
  fullName?: boolean;
};

export const FileIcon: FC<TFile> = ({ name, url, fullName }) => {
  return (
    <Link
      to={`${URL_BACKEND}${url}`}
      className={styles.link}
      onClick={(e) => e.stopPropagation()}
      target="_blank"
    >
      {(name.toLowerCase().includes(".doc") ||
        name.toLowerCase().includes(".docx") ||
        name.toLowerCase().includes(".docm")) && (
        <img className={styles.img} src={word_icon} alt={name} />
      )}
      {name.toLowerCase().includes(".pdf") && <img className={styles.img} src={pdf_icon} alt={name} />}
      {(name.toLowerCase().includes(".xls") ||
        name.toLowerCase().includes(".xlsx")) && (
        <img className={styles.img} src={excel_icon} alt={name} />
      )}
            {(name.toLowerCase().includes(".png") ||
        name.toLowerCase().includes(".pjp") ||
        name.toLowerCase().includes(".pjpeg") ||
        name.toLowerCase().includes(".jpeg") ||
        name.toLowerCase().includes(".jfif") ||
        name.toLowerCase().includes(".jpg")) && (
        <img className={styles.img} src={image_icon} alt={name} />
      )}
    </Link>
  );
};
