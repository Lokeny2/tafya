type FormFieldProps = {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
};

export default function FormField({ label, id, error, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p className="mt-1.5 text-xs text-urgent" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}