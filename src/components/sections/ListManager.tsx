import React from 'react';
import { LineButton } from '../buttons/LineButton';

interface ListItemAction {
  label: React.ReactNode;
  onClick: (item: string) => void;
  color?: string;
}

interface ListManagerProps {
  title: string;
  items: string[];
  emptyMessage: string;
  actions: ListItemAction[];
  itemDisplay?: (item: string) => React.ReactNode;
  className?: string;
}

export const ListManager = ({
  title,
  items,
  emptyMessage,
  actions,
  itemDisplay,
  className = '',
}: ListManagerProps) => {
  return (
    <section className={`rounded-lg p-6 shadow-md ${className}`}>
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      {items.length === 0 ? (
        <p>{emptyMessage}</p>
      ) : (
        <ul className="divide-y divide-on-body">
          {items.map((item) => (
            <li key={item} className="py-3">
              <div className="flex items-center justify-between">
                {itemDisplay ? (
                  itemDisplay(item)
                ) : (
                  <span className="font-medium">{item}</span>
                )}
                <div className="flex space-x-2">
                  {actions.map((action, i) => (
                    <LineButton
                      key={i}
                      onClick={() => action.onClick(item)}
                      color={action.color}
                    >
                      {action.label}
                    </LineButton>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
