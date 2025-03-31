import { ATTRIBUTE_LIST } from './consts';
import type { Attributes } from "./types";

const CalculateModifier = (attributeValue: number) => Math.trunc(attributeValue / 2) - 5;

function AttributeColumn({ values, modifiers, handleValueUpdate }: { values: Attributes, modifiers: Attributes, handleValueUpdate: (attribute: string, value: number) => void }) {
    return <div className='App-column'>
        <h2>Attributes</h2>
        {ATTRIBUTE_LIST.map((attribute) => (
        <Attribute 
            key={attribute} 
            name={attribute}
            value={values[attribute]}
            modifier={modifiers[attribute]}
            handleIncrement={() => {handleValueUpdate(attribute, values[attribute] + 1)}}
            handleDecrement={() => {handleValueUpdate(attribute, values[attribute] - 1)}}
        />
        ))}
    </div>;
}
  
function Attribute({ name, value, modifier, handleIncrement, handleDecrement }: 
    { name: string, value: number, modifier: number, handleIncrement: () => void, handleDecrement: () => void }) {
    return <div>
        {name}: {value} (Modifier {CalculateModifier(value)})
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
    </div>;
}

export default AttributeColumn;