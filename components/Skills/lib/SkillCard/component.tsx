import { useTranslation } from "next-i18next";
import { FC, } from "react"

import { Props } from "./props";

export const SkillCard: FC<Props> = ({ name, level_name, increment }: Props) => {

    const { t } = useTranslation("common");

    return (
        <div className="flex flex-col gap-2 text-center p-2 rounded-lg border-2 border-gray-900 dark:border-white-900">
            <span>{name}</span>
            <span>{level_name}</span>
            <button
                className="border-1 hover:border-purple-500 border-purple-500"
                onClick={increment}
            > {t("skills.train")}
            </button>
        </div>
    )
}