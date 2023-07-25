import React from 'react';
import styles from './Scheme.module.scss';

export const Scheme = () => {
    return (
        // <div className={styles.scheme}>
            <div className={styles.tree}>
                <ul>
                    <li>
                        <a href="#">Менеджер</a>
                        <ul>
                            <li>
                                <a href="#">Инженер</a>
                                <ul>
                                    <li>
                                        <a href="#">Отдел закупок</a>
                                        {/* <ul>
                                            <li>
                                                <a href="#">Grand Child</a>
                                            </li>
                                        </ul> */}
                                    </li>
                                    <li>
                                        <a href="#">Проектный отдел</a>
                                        {/* <ul>
                                            <li>
                                                <a href="#">Grand Child</a>
                                            </li>
                                        </ul> */}
                                    </li>
                                    <li>
                                        <a href="#">Юридический отдел</a>
                                        {/* <ul>
                                            <li>
                                                <a href="#">Grand Child</a>
                                            </li>
                                        </ul> */}
                                    </li>
                                    <li>
                                        <a href="#">Бригадир и монтажники</a>
                                        {/* <ul>
                                            <li><a href="#">Grand Child</a></li>
                                            <li>
                                                <a href="#">Grand Child</a>
                                                <ul>
                                                    <li>
                                                        <a href="#">Great Grand Child</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Great Grand Child</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Great Grand Child</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li><a href="#">Grand Child</a></li>
                                        </ul> */}
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        // </div>


        //     <div className={styles.main_manager}>
        //         <div className={styles.manager}>Менеджер</div>
        //     React.</div>
        //     <div>
        //         <div className={styles.enginer}>
        //             Инженер
        //         </div>
        //         <div>
        //             Высокий приоритет
        //         </div>
        //         <div>
        //             Дедлайн 20.12.23
        //         </div>
        //     </div>
        //     <div className={styles.rightBlock}>
        //         <div className={styles.firstBlock}>
        //             <div className={styles.purchasing}>
        //                 Отдел закупок
        //             </div>
        //             <div className={styles.avatars}>

        //             </div>
        //         </div>
        //         <div className={styles.firstBlock}>
        //             <div className={styles.projectDep}>
        //                 Проектный отдел
        //             </div>
        //             <div className={styles.avatars}>

        //             </div>
        //         </div>
        //         <div className={styles.firstBlock}>
        //             <div className={styles.legal}>
        //                 Юридический отдел
        //             </div>
        //             <div className={styles.avatars}>

        //             </div>
        //         </div>
        //         <div className={styles.firstBlock}>
        //             <div className={styles.brigade}>
        //                 Бригадир и монтажники
        //             </div>
        //             <div className={styles.avatars}>

        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};