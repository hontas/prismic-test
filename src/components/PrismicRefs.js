import React, { useContext } from 'react';
import PrismicContext from '../context/PrismicContext';
import DropDown from './DropDown';

function PrismicRefs({ className = '' }) {
  const { refs, currentRef, setPrismicRef } = useContext(PrismicContext);
  const selected = refs.find(({ ref }) => ref === currentRef) || {};
  const otherRefs = refs
    .filter(({ ref }) => ref !== currentRef)
    .map(({ ref, label }) => ({ id: ref, label }));

  return (
    <div className={`PrismicRefs ${className}`}>
      Prismic ref:{' '}
      <DropDown
        list={otherRefs}
        selected={selected.label}
        onSelect={setPrismicRef}
      />
    </div>
  );
}

export default PrismicRefs;
