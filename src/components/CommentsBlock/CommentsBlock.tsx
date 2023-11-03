import { FC, useEffect, useState } from "react";
import styles from "./CommentsBlock.module.scss";
import { TComment } from "../../types/TComment";
import { UserBlock } from "../UserBlock/UserBlock";
import close from "../../images/icons/close.svg";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  addCommentApi,
  deleteCommentApi,
  getListByIdApi,
} from "../../utils/api";
import { useLocation, useNavigate } from "react-router";
import { getList } from "../../services/slices/list";
import { access } from "../../utils/constants";
import { formateDateShort } from "../../utils/utils-date";
import { TList } from "../../types";
import { BlockButton } from "../BlockButton/BlockButton";

type TCommentsBlock = {
  isAddComment?:boolean
}

export const CommentsBlock: FC<TCommentsBlock> = ({isAddComment=false}) => {
  const { user } = useAppSelector((state) => state.user);
  const { list } = useAppSelector((state) => state.list);
  const [textarea, setTextarea] = useState<string>("");
  const location = useLocation();
  const id_list = Number(location.pathname.slice(14));
  const [data, setData] = useState<TComment[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getList());
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    getListByIdApi(id_list).then((res: TList) => {
      setData(res.comments ? res.comments : []);
    });
  }, [list]);
  return (
    <div className={styles.container}>
      <ul className={`${styles.comments} ${isAddComment && styles.comments_mini}`}>
        {data && data.length != 0 ? (
          data.map((comment) => (
            <li className={`${styles.comments__item} `}>
              <div>
                <div className={styles.user}>
                  <UserBlock
                    name={comment.user.name}
                    avatar={comment.user.avatar}
                    fullName={true}
                  />
                  <span className={styles.user__time}>
                    {formateDateShort(comment.createdAt)}
                  </span>
                </div>
                <p
                  className={`${styles.comments__text} ${
                    user.access === access.MANAGER && styles.manager
                  }`}
                >
                  {comment.comment}
                </p>
              </div>
              {user.id === comment.user.id && (
                <img
                  src={close}
                  alt="Удаление"
                  className={styles.close}
                  onClick={() => {
                    deleteCommentApi(comment.id)
                      .then((res) => {
                        dispatch(getList());
                      })
                      .catch((err) => {});
                  }}
                />
              )}
            </li>
          ))
        ) : (
          <p>Комментариев нет</p>
        )}
      </ul>
      {isAddComment && <div>
        <p className={styles.caption}>Комментарий</p>
        <textarea
          className={styles.textarea}
          placeholder={"Введите текст (до 500 символов)"}
          value={textarea}
          onChange={(e) => setTextarea(e.target.value)}
          maxLength={500}
          minLength={0}
        ></textarea>
        <BlockButton
          text={"Отправить"}
          disabled={textarea === ""}
          onClick={() => {
            addCommentApi(id_list, user.id, textarea);
            setTextarea("");
            dispatch(getList())
          }}
        />
      </div>}
    </div>
  );
};
