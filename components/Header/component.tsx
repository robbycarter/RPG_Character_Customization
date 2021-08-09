import clsx from "clsx";
import { Container } from "components";
import { useOnClickOutside } from "lib";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { HiMoon, HiSun } from "react-icons/hi";
import exportFromJSON from 'export-from-json'
import { useFileUpload } from "use-file-upload";
import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "hooks";

import { setCharacterName, setCharacterRace } from "features/character/character.slice";
import { setAttribute } from "features/attributes/attributes.slice"
import { setSkillOptions } from "features/skills/skills.slice"

enum Themes {
    light = "light",
    dark = "dark",
}

enum Languages {
    en = "en",
    ru = "ru",
}

const languages = [
    {
        id: Languages.ru,
        name: "RU",
        flag: "🇷🇺",
    },
    {
        id: Languages.en,
        name: "EN",
        flag: "🇺🇸",
    },
];

export const Header: FC = () => {

    const ref = useRef<HTMLDivElement>(null);
    const settingref = useRef<HTMLDivElement>(null)
    const { t } = useTranslation("common");
    const dispatch = useAppDispatch();

    const [mounted, setMounted] = useState(false);
    const [langPicker, setLangPicker] = useState(false);
    const [showSettings, setShowSettings] = useState<boolean>(false)

    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const [language, setLanguage] = useState<string>(
        router.locale || Languages.en
    );

    const [characterImportFile, selectCharacterImportFile] = useFileUpload()


    const toggleTheme = useCallback(() => {
        setTheme(theme === Themes.light ? Themes.dark : Themes.light);
    }, [setTheme, theme]);

    const toggleLangPicker = useCallback(() => {
        setLangPicker((prev) => !prev);
    }, []);

    const turnOffLangPicker = useCallback(() => {
        setLangPicker(false);
    }, []);

    const turnOffSettings = useCallback(() => {
        setShowSettings(false);
    }, []);

    useOnClickOutside(ref, turnOffLangPicker)
    useOnClickOutside(settingref, turnOffSettings)

    const toggleLanguage = useCallback(
        (newLanguage: Languages) => {
            return () => {
                turnOffLangPicker();
                setLanguage(newLanguage);
                if (newLanguage !== language)
                    router.push("/", "/", { locale: newLanguage });
            };
        },
        [router, turnOffLangPicker, language]
    );

    useEffect(() => setMounted(true), []);



    const { attributes, character, skills } = useAppSelector((state) => state)

    const exportCharacter = () => {
        let character_data = {
            character,
            attributes,
            skills,
            version: 1.0
        }

        const fileName = character_data.character.name
        const exportType = exportFromJSON.types.json

        exportFromJSON({ data: character_data, fileName, exportType })

    }

    const importCharacter = () => {

        selectCharacterImportFile({ accept: 'application/json', multiple: false }, (data: any) => {
            // file - is the raw File Object
            let reader = new FileReader()

            reader.onloadend = () => {
                let imported_character = JSON.parse(reader.result as string)

                // Basic Info
                dispatch(setCharacterName(imported_character.character.name))
                dispatch(setCharacterRace(imported_character.character.race))

                // Attributes
                dispatch(setAttribute(imported_character.attributes))

                // Skills
                dispatch(setSkillOptions({
                    skillOption: imported_character.skills.skillOption
                }))
            }

            if (data.file) {
                reader.readAsText(data.file)
            }
        })
    }

    const resetCharacter = () => {
        // Basic Info
        dispatch(setCharacterName(""))
        dispatch(setCharacterRace(""))

        // Attributes
        dispatch(setAttribute({}))

        // Skills
        dispatch(setSkillOptions({}))
    }


    return (
        <div
            className={clsx(
                "fixed z-20 w-full opacity-90 bg-lightTheme dark:bg-darkTheme transition-top duration-300",
                "top-0"
            )}
        >
            <Container className="ml-auto mr-0 flex items-end justify-end w-auto py-5 md:py-9 text-black-900 dark:text-white-900">
                <div className="flex items-center justify-between gap-2">
                    {/* Character Settings */}
                    <div className="relative" ref={settingref}>
                        <button
                            className="py-2 pl-4 text-base font-medium uppercase rounded appearance-none pr-9 focus:outline-none focus:ring-2 focus:ring-blue-700 bg-none"
                            onClick={() => {
                                setShowSettings(!showSettings)
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                        {showSettings && (
                            <div className="absolute p-1 mt-4 bg-pink dark:bg-white-900 rounded-md text-black-900">
                                <div>
                                    <button
                                        onClick={() => {
                                            resetCharacter()
                                        }}
                                        className="block w-full px-2 py-1 text-left hover:bg-white-700 rounded-md transition-colors focus:outline-none"
                                    >{t("settings.NewCharacter")}</button>
                                </div>
                                <div>
                                    <button
                                        onClick={() => {
                                            importCharacter()
                                        }}
                                        className="block w-full px-2 py-1 text-left hover:bg-white-700 rounded-md transition-colors focus:outline-none"
                                    >{t("settings.ImportCharacter")}</button>
                                </div>
                                <div>
                                    <button
                                        onClick={() => {
                                            exportCharacter()
                                        }}
                                        className="block w-full px-2 py-1 text-left hover:bg-white-700 rounded-md transition-colors focus:outline-none"
                                    >{t("settings.ExportCharacter")}</button>

                                </div>
                            </div>
                        )}
                        <span className="absolute top-0 right-0 flex items-center justify-center w-10 h-full text-center pointer-events-none">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                            >
                                <path d="M6 9l6 6 6-6"></path>
                            </svg>
                        </span>
                    </div>

                    {/* Theme Switch */}
                    <button
                        className="items-center justify-center w-12 h-12 rounded-md dark:bg-gray-900 bg-pink focus:outline-none focus:ring-2 ring-blue-700 d-flex"
                        onClick={toggleTheme}
                    >
                        {mounted ? (
                            theme === Themes.light ? (
                                <HiMoon className="inline w-6 h-6 ml-1" />
                            ) : (
                                <HiSun className="inline w-6 h-6" />
                            )
                        ) : null}
                    </button>

                    {/* Language Switch */}
                    <div className="relative " ref={ref}>
                        <button
                            className="py-2 pl-4 text-base font-medium uppercase rounded appearance-none pr-9 focus:outline-none focus:ring-2 focus:ring-blue-700 bg-none"
                            onClick={toggleLangPicker}
                        >
                            {language}
                        </button>
                        {langPicker && (
                            <div className="absolute w-full p-1 mt-4 bg-pink dark:bg-white-900 rounded-md text-black-900">
                                {languages.map((currentLanguage, i) => (
                                    <div key={currentLanguage.name}>
                                        <button
                                            className="block w-full px-2 py-1 text-left hover:bg-white-700 rounded-md transition-colors focus:outline-none"
                                            key={currentLanguage.id}
                                            onClick={toggleLanguage(currentLanguage.id)}
                                        >
                                            <p className={clsx("inline")}>{currentLanguage.name} </p>
                                            <span role="img" aria-label="flag">
                                                {currentLanguage.flag}
                                            </span>
                                        </button>
                                        {i !== languages.length - 1 && (
                                            <div className="my-1 bg-white-700 h-0.5" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        <span className="absolute top-0 right-0 flex items-center justify-center w-10 h-full text-center pointer-events-none">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                            >
                                <path d="M6 9l6 6 6-6"></path>
                            </svg>
                        </span>
                    </div>
                </div>
            </Container>
        </div>
    );
};