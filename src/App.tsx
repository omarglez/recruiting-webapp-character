import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST, COUNT } from './consts';
import type { Attributes, Class } from "./types";

const MaxAttributeCount = ATTRIBUTE_LIST.length;

const InitialAttributes = ATTRIBUTE_LIST.reduce((acc, attribute) => {
  acc[attribute] = 8;
  return acc;
}, {} as Attributes);

const InitialClassRestrictions = Object.keys(CLASS_LIST).reduce((acc, className) => { 
  let count = 0;
  acc[className] = ATTRIBUTE_LIST.reduce((acc, attribute) => {
    let isValid = InitialAttributes[attribute] >= CLASS_LIST[className][attribute]
    count = isValid ? count + 1 : count;
    acc[attribute] = isValid;
    return acc;
  }, {});

  acc[className][COUNT] = count;
  return acc;
}, {});

function App() {
  const [values, setValues] = useState<Attributes>(InitialAttributes);
  const [classRestrictions, setClassRestrictions] = useState(InitialClassRestrictions);

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise - Omar Gonzalez</h1>
      </header>
      <section className="App-section">
        <div className='App-column'>
        <h2>Attributes</h2>
          {ATTRIBUTE_LIST.map((attribute, index) => (
            <Attribute 
              key={attribute} 
              name={attribute}
              value={values[attribute]}
              handleIncrement={() => {updateValue(attribute, values[attribute] + 1)}}
              handleDecrement={() => {updateValue(attribute, values[attribute] - 1)}}
            />
          ))}
        </div>
        <div className='App-column'>
          <h2>Classes</h2>
          {Object.entries(CLASS_LIST).map(([className]) => (
            <div key={className} className={(classRestrictions[className][COUNT] === MaxAttributeCount ? "Classname-Enabled" : "")}>
              {className} {classRestrictions[className][COUNT]}
            </div>
          ))}
        </div>
      </section>
      <section className="App-section">
      </section>
    </div>
  );
}

function Attribute({ name, value, handleIncrement, handleDecrement }: 
  { name: string, value: number, handleIncrement: () => void, handleDecrement: () => void }) {
  return <div>
    {name}: {value}
    <button onClick={handleIncrement}>+</button>
    <button onClick={handleDecrement}>-</button>
  </div>;
}

export default App;
