import { Container } from "components";
import { setCharacterName, setCharacterRace } from "features/character/character.slice";
import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "hooks"
import { useTranslation } from "next-i18next";
import { IRace, IRaces, IRacesOptions } from "./props";

export const BasicInfo: FC = () => {

    const { name, race } = useAppSelector((state) => state.character)
    const dispatch = useAppDispatch();

    const { t } = useTranslation("common");

    const races: IRaces = t("basicInfo.raceOptions", { returnObjects: true })

    const raceOptions: IRacesOptions = races.map((race: IRace) => {
        return {
            label: race.label,
            value: race.value
        }
    })

    return (
        <Container className="pt-24 md:pt-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* Character Name */}
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3">
                        <label className="block font-bold md:text-center">
                            {t("basicInfo.name")}
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="appearance-none border-2 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="text"
                            value={name}
                            onChange={(value) => {
                                dispatch(setCharacterName(value.target.value))
                            }}
                        />
                    </div>
                </div>

                {/* Race */}
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3">
                        <label className="block font-bold md:text-center">
                            {t("basicInfo.race")}
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <select
                            className="border-2 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            onChange={(value) => {
                                dispatch(setCharacterRace(value.target.value))
                            }}
                        >
                            {raceOptions && raceOptions.map(raceOption => {
                                if (race === raceOption.value) return <option key={raceOption.value} value={raceOption.value} selected>{raceOption.label}</option>
                                return <option
                                    key={raceOption.value}
                                    value={raceOption.value}
                                >{raceOption.label}</option>
                            })}
                        </select>
                    </div>
                </div>

            </div>
        </Container>
    )
}