import type { Attributes, ClassRestriction, Class, Skills } from "./types";
import { CalculateModifier } from "./Utils";

export const COUNT = "Count";

export const ATTRIBUTE_LIST = [
    'Strength',
    'Dexterity',
    'Constitution',
    'Intelligence',
    'Wisdom',
    'Charisma',
];

export const CLASS_LIST: Record<Class, Attributes> = {
    'Barbarian': {
        'Strength': 14,
        'Dexterity': 9,
        'Constitution': 9,
        'Intelligence': 9,
        'Wisdom': 9,
        'Charisma': 9,
    },
    'Wizard': {
        'Strength': 9,
        'Dexterity': 9,
        'Constitution': 9,
        'Intelligence': 14,
        'Wisdom': 9,
        'Charisma': 9,
    },
    'Bard': {
        'Strength': 9,
        'Dexterity': 9,
        'Constitution': 9,
        'Intelligence': 9,
        'Wisdom': 9,
        'Charisma': 14,
    },
}

export const SKILL_LIST = [
    { name: 'Acrobatics', attributeModifier: 'Dexterity' },
    { name: 'Animal Handling', attributeModifier: 'Wisdom' },
    { name: 'Arcana', attributeModifier: 'Intelligence' },
    { name: 'Athletics', attributeModifier: 'Strength' },
    { name: 'Deception', attributeModifier: 'Charisma' },
    { name: 'History', attributeModifier: 'Intelligence' },
    { name: 'Insight', attributeModifier: 'Wisdom' },
    { name: 'Intimidation', attributeModifier: 'Charisma' },
    { name: 'Investigation', attributeModifier: 'Intelligence' },
    { name: 'Medicine', attributeModifier: 'Wisdom' },
    { name: 'Nature', attributeModifier: 'Intelligence' },
    { name: 'Perception', attributeModifier: 'Wisdom' },
    { name: 'Performance', attributeModifier: 'Charisma' },
    { name: 'Persuasion', attributeModifier: 'Charisma' },
    { name: 'Religion', attributeModifier: 'Intelligence' },
    { name: 'Sleight of Hand', attributeModifier: 'Dexterity' },
    { name: 'Stealth', attributeModifier: 'Dexterity' },
    { name: 'Survival', attributeModifier: 'Wisdom' },

]

export const MAX_ATTRIBUTE_COUNT = ATTRIBUTE_LIST.length;

export const INITIAL_ATTRIBUTES = ATTRIBUTE_LIST.reduce((acc, attribute) => {
    acc[attribute] = 8;
    return acc;
}, {} as Attributes);

export const INITIAL_MODIFIERS = ATTRIBUTE_LIST.reduce((acc, attribute) => {
    acc[attribute] = CalculateModifier(INITIAL_ATTRIBUTES[attribute]);
    return acc;
}, {} as Attributes);

export const INITIAL_CLASS_RESTRICTIONS = Object.keys(CLASS_LIST).reduce((acc, className) => { 
    let count = 0;
    acc[className] = ATTRIBUTE_LIST.reduce((acc, attribute) => {
        let isValid = INITIAL_ATTRIBUTES[attribute] >= CLASS_LIST[className][attribute];
        count = isValid ? count + 1 : count;
        acc[attribute] = isValid;
        return acc;
    }, {}) as ClassRestriction;

    acc[className][COUNT] = count;
    return acc;
}, {}) as Record<Class, ClassRestriction>;

export const INITIAL_SKILLS = { ...(SKILL_LIST.map((skill) => skill.name).reduce((acc, name) => {acc[name] = 0; return acc;}, {})), TOTAL: 0 } as Skills;