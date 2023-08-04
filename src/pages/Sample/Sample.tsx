import { FC, useEffect } from "react";
import styles from "./Sample.module.scss";
import { BlockAddSample } from "../../components/BlockAddSample/BlockAddSample";
import { HeaderTop } from "../../components/HeaderTop/HeaderTop";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getSample } from "../../services/slices/sample";
import { useNavigate } from "react-router";

export const Sample: FC = () => {
  const {samples} = useAppSelector((state) => state.sample);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { isAuth, user } = useAppSelector((state) => state.user);
  useEffect(() => {
      dispatch(getSample());
  }, []);
  return (
    <div className={styles.block}>
      <HeaderTop />
      <div className={styles.block_conteiner}>
        <BlockAddSample data={samples} />
      </div>
    </div>
  );
};
