interface FigureProps {
  primaryLabel: string;
  secondaryLabel: string;
  imageSrc: string;
  className?: string;
}

const Figure = ({
  primaryLabel,
  secondaryLabel,
  imageSrc,
  className = '',
}: FigureProps) => {
  return (
    <div
      className={`box is-inline-flex is-justify-content-center is-align-items-center is-flex-direction-column ${className}`}
    >
      <p className='mb-2'>{primaryLabel}</p>
      <figure className={`image is-48x48 mb-2`}>
        <img alt='Image' src={imageSrc} />
      </figure>
      <p>{secondaryLabel}</p>
    </div>
  );
};

export { Figure };
