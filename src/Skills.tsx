import { SKILL_LIST } from './consts';
import { Attributes, Skills } from './types';

function SkillColumn({ maxPoints, skillpoints, setSkillpoints, modifiers }: { maxPoints: number, skillpoints: Skills, setSkillpoints: any, modifiers: Attributes}) {
    const updateValue = (name: string, value: number) => {
        if (value < 0)
        {
            alert("A skill value cannot go lower than 0");
            return;
        }

        var delta = value - skillpoints[name];

        if (skillpoints["TOTAL"] + delta > maxPoints)
        {
            alert("You cannot spend more skill points");
            return;
        }

        setSkillpoints(prev => {
            let result = { ...prev };
            result[name] = value;
            result["TOTAL"] += delta;
            return result;
        });
    };

    return <div className='App-column'>
        <h2>Skills</h2>
        <p>Total Skill Points Used: {skillpoints["TOTAL"]} (Max: {maxPoints})</p>
        {SKILL_LIST.map(({name, attributeModifier}) => (
            <Skill 
                key={name} 
                name={name}
                modifierName={attributeModifier}
                value={skillpoints[name]}
                modifierValue={modifiers[attributeModifier]}
                handleIncrement={() => {updateValue(name, skillpoints[name] + 1)}}
                handleDecrement={() => {updateValue(name, skillpoints[name] - 1)}}
            />
        ))}
    </div>;
}

function Skill({ name, modifierName, value, modifierValue, handleIncrement, handleDecrement }: 
    { name: string, modifierName: string, value: number, modifierValue: number, handleIncrement: () => void, handleDecrement: () => void }) {
    return <div>
        {name}: {value} (Modifier {modifierName})
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
        Total: {value + modifierValue}
    </div>;
}

export default SkillColumn;