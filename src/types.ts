export type Attributes = {
    Strength: number;
    Dexterity: number;
    Constitution: number;
    Intelligence: number;
    Wisdom: number;
    Charisma: number;
};

export type ClassRestriction = {
    Strength: boolean;
    Dexterity: boolean;
    Constitution: boolean;
    Intelligence: boolean;
    Wisdom: boolean;
    Charisma: boolean;
    COUNT: number;
};

export type Class = "Barbarian" | "Wizard" | "Bard";