interface ControlsHeaderProps {
  title: string;
  description?: string;
}

export const ControlsHeader = ({ title, description }: ControlsHeaderProps) => {
  return (
    <div className="border-b pb-4">
      <div className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
        {title}
      </div>
      {description && (
        <div className="text-foreground mt-1.5 text-sm">{description}</div>
      )}
    </div>
  );
};