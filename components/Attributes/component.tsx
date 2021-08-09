import { Container } from "components";
import {
    decrementCharacterAgility, incrementCharacterAgility,
    decrementCharacterCharisma, incrementCharacterCharisma,
    decrementCharacterStrength, incrementCharacterStrength,
    decrementCharacterIntelligence, incrementCharacterIntelligence
} from "features/attributes/attributes.slice";
import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "hooks"
import { useTranslation } from "next-i18next";

export const Attributes: FC = () => {

    const {
        agility, charisma, intelligence, strength,
        life, evasion, vigor
    } = useAppSelector((state) => state.attributes)
    const dispatch = useAppDispatch();

    const { t } = useTranslation("common");

    return (
        <Container className="pt-10 lg:pt-16">
            <div className="font-bold text-xl text-center">
                <span>{t("attributes.title")}</span>
            </div>
            <div className="mt-5 grid justify-items-center grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="w-full text-center p-2 rounded-lg border-2 border-yellow-800">
                    <div className="cursor-pointer"
                        onClick={() => {
                            dispatch(incrementCharacterStrength())
                        }}
                    >+</div>
                    <div>{t("attributes.strength")}: {strength}</div>
                    <div className="cursor-pointer"
                        onClick={() => {
                            if (strength > 0) return dispatch(decrementCharacterStrength())
                        }}
                    >-</div>
                </div>
                <div className="w-full text-center p-2 rounded-lg border-2 border-blue-400">
                    <div className="cursor-pointer"
                        onClick={() => {
                            dispatch(incrementCharacterIntelligence())
                        }}
                    >+</div>
                    <div>{t("attributes.intelligence")}: {intelligence}</div>
                    <div className="cursor-pointer"
                        onClick={() => {
                            if (intelligence > 0) return dispatch(decrementCharacterIntelligence())
                        }}
                    >-</div>
                </div>
                <div className="w-full text-center p-2 rounded-lg border-2 border-green-600">
                    <div className="cursor-pointer"
                        onClick={() => {
                            dispatch(incrementCharacterAgility())
                        }}
                    >+</div>
                    <div>{t("attributes.agility")}: {agility}</div>
                    <div className="cursor-pointer"
                        onClick={() => {
                            if (agility > 0) return dispatch(decrementCharacterAgility())
                        }}
                    >-</div>
                </div>
                <div className="w-full text-center p-2 rounded-lg border-2 border-yellow-400">
                    <div className="cursor-pointer"
                        onClick={() => {
                            dispatch(incrementCharacterCharisma())
                        }}
                    >+</div>
                    <div>{t("attributes.charisma")}: {charisma}</div>
                    <div className="cursor-pointer"
                        onClick={() => {
                            if (charisma > 0) return dispatch(decrementCharacterCharisma())
                        }}
                    >-</div>
                </div>
            </div>
            <div className="pt-10 grid justify-items-center grid-cols-3 gap-5">
                <div className="w-full text-center p-2 rounded-lg border-2 border-red-400">
                    <div>{t("attributes.life")}: {life}</div>
                </div>
                <div className="w-full text-center p-2 rounded-lg border-2 border-green-300">
                    <div>{t("attributes.evasion")}: {evasion}</div>
                </div>
                <div className="w-full text-center p-2 rounded-lg border-2 border-yellow-500">
                    <div>{t("attributes.vigor")}: {vigor}</div>
                </div>
            </div>
        </Container>
    )
}