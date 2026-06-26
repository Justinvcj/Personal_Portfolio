import './Grainient.css';

export interface GrainientProps {
  color1?: string;
  color2?: string;
  color3?: string;
  blendSoftness?: number;
  noiseScale?: number;
  className?: string;
  rotationAmount?: number;
}

const Grainient = ({
  color1 = "#171723",
  color2 = "#3b82f6",
  color3 = "#ef4444",
  className = "",
}: GrainientProps) => {
  return (
    <div 
      className={`grainient-container ${className}`.trim()}
      style={{
        '--color1': color1,
        '--color2': color2,
        '--color3': color3,
      } as React.CSSProperties}
    >
      <div className="grainient-blob"></div>
      <div className="grainient-noise"></div>
    </div>
  );
};

export default Grainient;
