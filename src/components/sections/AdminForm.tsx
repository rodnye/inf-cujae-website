'use client';

import { useEffect, useState } from 'react';
import { TextField } from '@/components/inputs/TextField';
import { Button } from '@/components/buttons/Button';
import { LineButton } from '@/components/buttons/LineButton';

export type FieldConfig = {
  type: 'text' | 'date' | 'number' | 'email' | 'password' | 'select' | 'tags';
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: { value: string; label: string }[];
};

type FormProps<T extends Record<string, any>> = {
  data: T;
  fieldConfig: Record<keyof T, FieldConfig>;
  onChange?: (data: T) => void;
  onSubmit: (data: T) => Promise<void> | void;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  className?: string;
};

export const AdminForm = <T extends Record<string, any>>({
  data: externalData,
  fieldConfig,
  onChange,
  onSubmit,
  onCancel,
  submitText = 'Submit',
  cancelText = 'Cancelar',
  className = '',
}: FormProps<T>) => {
  const [formData, setFormData] = useState<T>(externalData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData(externalData);
  }, [externalData]);

  const handleChange = (fieldName: keyof T) => (value: string | number) => {
    onChange?.({ ...formData, [fieldName]: value } as T);
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = async () => {
    try {
      await onSubmit(formData);
    } catch (e) {
      if (e instanceof Error) setError(e.message);
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {error && (
        <div className="rounded bg-red-100 p-2 text-red-600">{error}</div>
      )}

      {Object.entries(fieldConfig).map(([fieldName, config]) => {
        const key = fieldName as keyof T;
        const value = formData[key];

        return (
          <div key={fieldName} className="w-full">
            <label
              htmlFor={fieldName}
              className="mb-1 block text-sm font-medium"
            >
              {config.label}
              {config.required && <span className="text-red-500">*</span>}
            </label>

            {config.type === 'tags' ? (
              <div>
                <div className="flex items-center">
                  <TextField
                    type="text"
                    value={value?.newTag || ''}
                    className="mr-3 flex-grow"
                    onChange={(val) =>
                      handleChange(key)({ ...value, newTag: val })
                    }
                    placeholder="Añadir etiqueta"
                  />
                  <Button
                    onClick={() => {
                      const tag = value?.newTag?.trim();
                      if (tag && !value?.tags?.includes(tag)) {
                        handleChange(key)({
                          ...value,
                          tags: [...(value?.tags || []), tag],
                          newTag: '',
                        });
                      }
                    }}
                  >
                    Añadir
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {value?.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-on-primary"
                    >
                      {tag}
                      <button
                        className="ml-3 text-xl"
                        onClick={() =>
                          handleChange(key)({
                            ...value,
                            tags: value.tags.filter((t: string) => t !== tag),
                          })
                        }
                      >
                        <span className="sr-only">Eliminar etiqueta</span>
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ) : config.type === 'select' ? (
              <select
                name={fieldName}
                value={value as string}
                onChange={(e) => handleChange(key)(e.target.value)}
                className="w-full rounded border border-gray-300 p-2"
                disabled={config.disabled}
                required={config.required}
              >
                {config.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <TextField
                type={config.type}
                name={fieldName}
                className="w-full"
                placeholder={config.placeholder}
                value={value?.toString() || ''}
                onChange={handleChange(key)}
                required={config.required}
                disabled={config.disabled}
              />
            )}
          </div>
        );
      })}

      <div className="flex items-center space-x-4 pt-4">
        <Button onClick={handleSubmit}>{submitText}</Button>
        {onCancel && (
          <LineButton color="text-red-500" onClick={handleCancel}>
            {cancelText}
          </LineButton>
        )}
      </div>
    </div>
  );
};
