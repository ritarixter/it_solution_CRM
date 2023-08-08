import { FC} from "react";
import styles from "./Sample.module.scss";
import { BlockAddSample } from "../../components/BlockAddSample/BlockAddSample";
import { HeaderTop } from "../../components/HeaderTop/HeaderTop";
import { useAppSelector } from "../../services/hooks";

export const Sample: FC = () => {
  const {samples} = useAppSelector((state) => state.sample);

  return (
    <div className={styles.block}>
      <HeaderTop />
      <div className={styles.block_conteiner}>
        <BlockAddSample data={samples} />
      </div>
    </div>
  );
};
