import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "hooks"
import { useTranslation } from "next-i18next";

import {
    incrementSkill, descrementSkill,
} from "features/skills/skills.slice";

import { Container } from "components";
import { SkillCard } from "./lib/SkillCard";
import { ILevels, ISkillLevel, ISkillLevels, ISkills } from "./props";

export const Skills: FC = () => {

    const {
        skills: {
            skillOption
        },
        attributes
    } = useAppSelector((state) => state)
    const dispatch = useAppDispatch();

    const { t } = useTranslation("common");

    const skills: ISkills = t("skills.skillOptions", { returnObjects: true })
    const levels: ILevels = t("skills.levelOptions", { returnObjects: true })

    const skillSets: ISkillLevels = skills.map(skill => {

        let skillSet: ISkillLevel = {
            id: skill.id,
            name: skill.name,
            level: 0,
            level_name: ""
        };

        skillSet.level = skillOption.find(x => x.id == skill.id).level;
        skillSet.level_name = levels[skillSet.level].level
        return skillSet;
    })

    return (
        <Container className="pt-10 lg:pt-16">
            <div className="font-bold text-xl text-center">
                <span>{t("skills.title")}</span>
            </div>
            <div className="mt-5 grid grid-cols-2 lg:grid-cols-3 justify-items-center gap-10">
                {skillSets && skillSets.length != 0 && skillSets.map(skill => {
                    return (
                        <SkillCard
                            key={skill.id}
                            level={skill.level}
                            level_name={skill.level_name}
                            name={skill.name}
                            increment={() => {
                                dispatch(incrementSkill({ id: skill.id, attributes }))
                            }}
                            decrement={() => {
                                dispatch(descrementSkill({ id: skill.id, attributes }))
                            }}
                        />
                    )
                })}
            </div>
        </Container>
    )
}