import React from 'react';
import GrudgeC from './GrudgeC';
import { GrudgeContext } from './GrudgeContext';

const GrudgesC = () => {
  const { grudges } = React.useContext(GrudgeContext);
  console.log('GrudgesC');
  return (
    <section className="Grudges">
      <h2>GrudgesC ({grudges.length})</h2>
      {grudges.map(grudge => (
        <GrudgeC key={grudge.id} grudge={grudge} />
      ))}
    </section>
  );
};

export default GrudgesC;
