'use client';

import { useEffect, useState } from 'react';
import { TextField } from '@/features/ui/inputs/TextField';
import { Button } from '@/features/ui/buttons/Button';
import { LineButton } from '@/features/ui/buttons/LineButton';

export type BaseFieldConfig = {
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

export type TextFieldConfig = BaseFieldConfig & {
  type: 'text' | 'date' | 'switch' | 'number' | 'email' | 'password' | 'tags';
};

export type AreaFieldConfig = BaseFieldConfig & {
  type: 'area';
  rows: number;
};
export type SelectFieldConfig = BaseFieldConfig & {
  type: 'select';
  options: { value: string; label: string }[];
};

export type FieldConfig = TextFieldConfig | AreaFieldConfig | SelectFieldConfig;

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

  const handleChange =
    (fieldName: keyof T) => (value: string | number | string[] | boolean) => {
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

            {config.type === 'switch' ? (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={fieldName}
                  checked={!!value}
                  onChange={(e) => handleChange(key)(e.target.checked)}
                  className="mr-2"
                  disabled={config.disabled}
                />
                <span>{config.label}</span>
              </div>
            ) : config.type === 'tags' ? (
              <div>
                <div className="flex items-center">
                  <TextField
                    type="text"
                    value={value[0] || ''}
                    className="mr-3 flex-grow"
                    onChange={(val) => {
                      value[0] = val;
                      handleChange(key)([...value]);
                    }}
                    placeholder="Añadir etiqueta"
                  />
                  <Button
                    onClick={() => {
                      const tag = value?.[0]?.trim();
                      value[0] = '';
                      if (tag && !value?.includes(tag)) {
                        handleChange(key)([...value, tag]);
                      }
                    }}
                  >
                    Añadir
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {value.map(
                    (tag: string, i: number) =>
                      i != 0 && (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-on-primary"
                        >
                          {tag}
                          <button
                            className="ml-3 text-xl"
                            onClick={() => {
                              handleChange(key)([
                                value.shift(),
                                ...value.filter((t: string) => t !== tag),
                              ]);
                            }}
                          >
                            <span className="sr-only">Eliminar etiqueta</span>
                            &times;
                          </button>
                        </span>
                      ),
                  )}
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
                rows={config.type === 'area' ? config.rows : undefined}
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
