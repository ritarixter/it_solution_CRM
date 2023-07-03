import { FC} from "react";
import { TableTask, Wrapper } from "../../components";
import { useAppSelector } from "../../services/hooks";
import  styles  from "./Applications.module.scss"
import { HeaderTop } from "../../components/HeaderTop/HeaderTop";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { getCookie } from "../../utils/cookies";


export const Applications: FC = () => {
  const { list } = useAppSelector((state) => state.list);
  return (

      <Wrapper>
      <HeaderTop />
      <div className={styles.container}>
      <TableTask mini={false} list={list} />
     
      </div>
      </Wrapper>

  );
};
