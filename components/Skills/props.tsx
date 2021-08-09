export type ISkill = {
    id: number
    name: string
    // level?: number
    // level_name?: string
}

export type ISkills = ISkill[]

export type ILevel = {
    level: string
}

export type ILevels = ILevel[]

export type ISkillLevel = {
    id: number
    name: string
    level: number
    level_name: string
}

export type ISkillLevels = ISkillLevel[]