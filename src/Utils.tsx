export const CalculateModifier = (attributeValue: number) => Math.trunc(attributeValue / 2) - 5;
export const CalculateMaxPoints = (intModifier: number) => Math.max(10 + (4 * intModifier), 0);
