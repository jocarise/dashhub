interface TextElementProps {
  primary?: string;
  secondary?: string;
}

const TextElement = ({ primary = '', secondary = '' }: TextElementProps) => {
  return (
    <div>
      <p className='is-size-5'>{primary}</p>
      <p className='is-size-4 has-text-weight-medium'>{secondary}</p>
    </div>
  );
};

export { TextElement };
