import { FC } from "react";
import styles from "./BlockMarginality.module.scss";

type TBlockMarginality = {
    marginality: number
}

export const BlockMarginality: FC<TBlockMarginality> = ({ marginality}) => {
    return (
        <div className={`${styles.conteiner} ${(marginality < 0) && styles.conteiner_style}`}>
            <p className={styles.conteiner_title}>Маржинальность</p>
            <p className={styles.conteiner_count}>{marginality}</p>
        </div>
    )
}