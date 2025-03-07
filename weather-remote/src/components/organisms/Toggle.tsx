interface ToggleProps {
  isLoading: boolean;
  primaryTitle: string;
  secondaryTitle: string;
  isSelected: boolean;
  onToggle: () => void;
}

const Toggle = (props: ToggleProps) => {
  const {
    isLoading,
    primaryTitle,
    secondaryTitle,
    isSelected,
    onToggle,
    ...propsRest
  } = props;

  return (
    <div
      className={`buttons has-addons ${isLoading ? 'is-skeleton' : ''}`}
      {...propsRest}
    >
      <button
        onClick={onToggle}
        className={`button ${isSelected && 'is-primary is-selected'} ${isLoading ? 'is-skeleton' : ''}`}
      >
        {primaryTitle}
      </button>
      <button
        onClick={onToggle}
        className={`button ${!isSelected && 'is-primary is-selected'} ${isLoading ? 'is-skeleton' : ''}`}
      >
        {secondaryTitle}
      </button>
    </div>
  );
};

export { Toggle };
