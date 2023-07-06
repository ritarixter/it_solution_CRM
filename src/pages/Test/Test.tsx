import { FC } from "react";
import { EffectMeter } from "../../components/EffectMeter/EffectMeter";
import {legalDep} from '../../components/EffectMeter/constantsLegalDep';
import {projectDep} from '../../components/EffectMeter/constantsProjectDep';
import {purchasingDep} from '../../components/EffectMeter/constantsPurchasingDep';
import { PopupNewList } from "../../components/PopupNewList/PopupNewList";

export const Test: FC = () => {
    return (
        <div style={{display: "flex"}}>
            <EffectMeter arr={legalDep} name = {"Юридически отдел"}/>
            <EffectMeter arr={purchasingDep} name = {"Отдел закупок"}/>
            <EffectMeter arr={projectDep} name = {"Проектный отдел"}/>
            <PopupNewList />
        </div>
    )

}
