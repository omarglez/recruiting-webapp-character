import { CLASS_LIST, COUNT, MAX_ATTRIBUTE_COUNT } from './consts';
import type { ClassRestriction, Class } from "./types";

export function Classes({ classRestrictions, handleClassSelected }: {classRestrictions: Record<Class, ClassRestriction>, handleClassSelected: (className: string) => void }) {
    return <div className='App-column'>
        <h2>Classes</h2>
        {Object.entries(CLASS_LIST).map(([className]) => (
        <div 
            key={className} 
            className={(classRestrictions[className][COUNT] === MAX_ATTRIBUTE_COUNT ? "Classname-Enabled" : "Classname-Disabled")}
            onClick={() => handleClassSelected(className)}
        >
            {className}
        </div>
        ))}
    </div>
}
  
export function RequirementView({ className, handleCloseView } : { className : Class, handleCloseView: () => void }) {
    return <div className='App-column'>
        <h2>{className} Minimum Requirements</h2>
        {
        Object.keys(CLASS_LIST[className]).map((attribute) => (
            <div key={attribute}>
            {attribute}: {CLASS_LIST[className][attribute]}
            </div>
        ))
        }
        <button onClick={handleCloseView}>Close Requirement View</button>
    </div>;
}