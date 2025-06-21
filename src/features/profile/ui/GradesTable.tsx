interface Subject {
  asignatura: string;
  nota: number;
  codigo: string;
  creditos: number;
}

interface GradesTableProps {
  year: string;
  subjects: Subject[];
}

export function GradesTable({ year, subjects }: GradesTableProps) {
  return (
    <div>
      <h4 className="mb-2 text-lg font-bold text-secondary">{year}</h4>
      <div className="overflow-x-auto">
        <table className="divide-secondary/20 w-full divide-y">
          <thead>
            <tr className="border-b">
              <th className="px-2 py-3 text-left font-medium">Asignatura</th>
              <th className="px-2 py-3 text-left font-medium">Código</th>
              <th className="px-2 py-3 text-left font-medium">Créditos</th>
              <th className="px-2 py-3 text-left font-medium">Calificación</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, idx) => (
              <tr key={subject.codigo} className="border-b last:border-0">
                <td className="px-2 py-3">{subject.asignatura}</td>
                <td className="px-2 py-3">{subject.codigo}</td>
                <td className="px-2 py-3">{subject.creditos}</td>
                <td className="px-2 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-medium ${
                        subject.nota >= 9
                          ? 'text-green-600'
                          : subject.nota >= 8
                            ? 'text-blue-600'
                            : 'text-yellow-600'
                      }`}
                    >
                      {subject.nota}
                    </span>
                    <div className="h-1.5 w-12 rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full ${
                          subject.nota >= 9
                            ? 'bg-green-500'
                            : subject.nota >= 8
                              ? 'bg-blue-500'
                              : 'bg-yellow-500'
                        }`}
                        style={{ width: `${subject.nota * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
