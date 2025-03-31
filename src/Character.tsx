import { type Attributes, type ClassRestriction, type Class, Skills } from "./types";
import { CLASS_LIST, COUNT, INITIAL_ATTRIBUTES, INITIAL_MODIFIERS, INITIAL_CLASS_RESTRICTIONS, INITIAL_SKILLS } from './consts';

import { useState } from 'react';
import { CalculateModifier, CalculateMaxPoints } from './Utils';

import AttributeColumn from './Attributes';
import { Classes, RequirementView } from './Classes';
import SkillColumn from './Skills';

function Character() {
    const [values, setValues] = useState<Attributes>(INITIAL_ATTRIBUTES);
    const [modifiers, setModifiers] = useState<Attributes>(INITIAL_MODIFIERS);
    const [skillpoints, setSkillpoints] = useState<Skills>(INITIAL_SKILLS);
    const [maxPoints, setMaxPoints] = useState<number>(CalculateMaxPoints(modifiers["Intelligence"]));
    const [classRestrictions, setClassRestrictions] = useState<Record<Class, ClassRestriction>>(INITIAL_CLASS_RESTRICTIONS);
    const [selectedClass, setSelectedClass] = useState<string>();
  
    const updateValue = (attribute: string, value: number) => {
        if (attribute === "Intelligence")
        {
            let newMaxPoints = CalculateMaxPoints(CalculateModifier(value));
            
            if (skillpoints["TOTAL"] > newMaxPoints)
            {
                alert("Cannot further reduce Intelligence. Try removing some skill points first!");
                return;
            }

            setMaxPoints(newMaxPoints);
        }
      
        setValues(prev => {
        let result = { ...prev, };
        result[attribute] = value;
        return result;
        });

        setModifiers(prev => {
        let result = { ...prev };
        result[attribute] = CalculateModifier(value);
        return result;
        });

        for (let className in CLASS_LIST)
        {
        updatePossibleClass(className as Class, attribute, value);
        }
    }
  
    const updatePossibleClass = (className : Class, attribute : string, value : number) => {
      let wasValid = classRestrictions[className][attribute];
      let isValid = value >= CLASS_LIST[className][attribute];
  
      // no change
      if (isValid === wasValid) return;
  
      let previousCount = classRestrictions[className][COUNT];
  
      setClassRestrictions(prev => {
        let result = {...prev};
        result[className][attribute] = isValid;
        result[className][COUNT] = isValid ? previousCount + 1 : previousCount - 1;
        return result;
      });
    }

    const updateSkills = (skillName: string, value: number) => {
        var delta = skillpoints[skillName] - value;

        setSkillpoints(prev => {
            let result = { ...prev };
            result[skillName] = value;
            return result;
        });

        setMaxPoints(prev => prev + delta);
    };
  
    return <section className="App-section">
        <AttributeColumn
            values={values}
            modifiers={modifiers}
            handleValueUpdate={updateValue}
        />
        <Classes 
            classRestrictions={classRestrictions}
            handleClassSelected={(className) => setSelectedClass(className)}
        />
        {selectedClass && <RequirementView className={selectedClass as Class} handleCloseView={() => setSelectedClass("")} />}
        <SkillColumn
            maxPoints={maxPoints}
            skillpoints={skillpoints}
            modifiers={modifiers}
            setSkillpoints={setSkillpoints}
        />
    </section>
}

export default Character;