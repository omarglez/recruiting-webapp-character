import { useState } from 'react';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST, COUNT, MAX_ATTRIBUTE_COUNT, INITIAL_ATTRIBUTES, INITIAL_CLASS_RESTRICTIONS } from './consts';
import type { Attributes, ClassRestriction, Class } from "./types";
import AttributeColumn from './Attributes';
import { Classes, RequirementView } from './Classes';

function Character() {
    const [values, setValues] = useState<Attributes>(INITIAL_ATTRIBUTES);
    const [classRestrictions, setClassRestrictions] = useState<Record<Class, ClassRestriction>>(INITIAL_CLASS_RESTRICTIONS);
    const [selectedClass, setSelectedClass] = useState<string>();
  
    const updateValue = (attribute: string, value: number) => {
      setValues(prev => {
        let result = {
          ...prev,
        };
        result[attribute] = value;
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
  
    return <section className="App-section">
        <AttributeColumn
            values={values}
            handleValueUpdate={updateValue}
        />
        <Classes 
            classRestrictions={classRestrictions}
            handleClassSelected={(className) => setSelectedClass(className)}
        />
        {selectedClass && <RequirementView className={selectedClass as Class} handleCloseView={() => setSelectedClass("")} />}
    </section>
}

export default Character;