import { FC } from "react";
import styles from "./BlockMarginality.module.scss";

type TBlockMarginality = {
    style?: boolean
}

export const BlockMarginality: FC<TBlockMarginality> = ({style}) => {
    return (
        <div className={`${styles.conteiner} ${style && styles.conteiner_style}`}>
            <p className={styles.conteiner_title}>Маржинальность</p>
            <p className={styles.conteiner_count}>254 354</p>
        </div>
    )
}