import { FC } from "react";
import styles from "./BlockMarginality.module.scss";

type TBlockMarginality = {
    style?: boolean
    marginality?: number
}

export const BlockMarginality: FC<TBlockMarginality> = ({style, marginality}) => {
    return (
        <div className={`${styles.conteiner} ${style && styles.conteiner_style}`}>
            <p className={styles.conteiner_title}>Маржинальность</p>
            <p className={styles.conteiner_count}>{marginality}</p>
        </div>
    )
}