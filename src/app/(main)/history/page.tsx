import React from 'react';

const HistoryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[--color-body] py-8 text-[--color-on-body]">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="relative inline-block">
            <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-yellow-500/30 via-amber-500/30 to-yellow-500/30 blur-3xl"></div>
            <div className="relative flex items-center justify-center gap-4">
              <div className="rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 p-4 shadow-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0c-4.418 0-8 1.79-8 4v1h16v-1c0-2.21-3.582-4-8-4z"
                  />
                </svg>
              </div>
              <h1 className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent lg:text-6xl">
                Historia de la CUJAE
              </h1>
            </div>
          </div>
          <p className="mt-6 text-lg text-slate-400">
            Descubre los momentos más importantes y el legado de nuestra
            universidad.
          </p>
        </div>
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Tarjeta 1 */}
          <div className="transform rounded-xl bg-slate-800 p-6 shadow-xl transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50">
            <h2 className="mb-4 text-2xl font-semibold text-red-400">
              30 de junio de 1900
            </h2>
            <p className="leading-relaxed text-slate-300">
              Inauguración de la antigua Escuela de Ingenieros, Electricistas y
              Arquitectos de la Universidad de La Habana. Dictadas las órdenes
              militares para tal efecto. Inicialmente se ubicó en el antiguo
              convento de San Agustín, hoy Museo de Historia de la Medicina
              Carlos J. Finlay; luego pasó a la Colina, adscripta a la facultad
              de Ciencias y Letras de ese Centro Universitario, con las carreras
              de Ingeniería Civil e Ingeniería Eléctrica, sumándose la de
              Arquitectura, el 1 de octubre del mismo año.
            </p>
          </div>

          {/* Tarjeta 2 */}
          <div className="transform rounded-xl bg-slate-800 p-6 shadow-xl transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50">
            <h2 className="mb-4 text-2xl font-semibold text-orange-400">
              1937
            </h2>
            <p className="leading-relaxed text-slate-300">
              Promulgada la Ley Docente. En la Universidad de La Habana se crean
              12 facultades; dentro de estas aparece la facultad de Ingeniería y
              Arquitectura, con nuevos programas para Ingeniería Civil,
              Ingeniería Eléctrica y Arquitectura, que se mantuvieron vigentes
              con ligeras modificaciones hasta 1960.
            </p>
          </div>

          {/* Tarjeta 3 */}
          <div className="transform rounded-xl bg-slate-800 p-6 shadow-xl transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-lime-500/50">
            <h2 className="mb-4 text-2xl font-semibold text-lime-400">1960</h2>
            <p className="leading-relaxed text-slate-300">
              El Comandante en Jefe Fidel Castro anunció el propósito de
              construir una ciudad universitaria. Nombrarla José Antonio
              Echeverría fue una idea que surgió prácticamente al unísono de
              todos los que comenzaron a colaborar de una forma u otra en este
              proyecto.
            </p>
          </div>

          {/* Tarjeta 4 */}
          <div className="transform rounded-xl bg-slate-800 p-6 shadow-xl transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50">
            <h2 className="mb-4 text-2xl font-semibold text-green-400">
              13 de marzo de 1961
            </h2>
            <p className="leading-relaxed text-slate-300">
              Se inauguraron oficialmente las obras constructivas. En
              conmemoración al cuarto aniversario del asalto al Palacio
              Presidencial y la toma de Radio Reloj, se inauguraron oficialmente
              las obras constructivas, en un acto presidido por el arquitecto
              Osmani Cienfuegos, Ministro de Obras Públicas, y en el que
              participaron varios dirigentes de la FEU, del Gobierno y numerosos
              profesores y estudiantes de la enseñanza superior.
            </p>
          </div>

          {/* Tarjeta 5 */}
          <div className="transform rounded-xl bg-slate-800 p-6 shadow-xl transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/50">
            <h2 className="mb-4 text-2xl font-semibold text-teal-400">
              18 de noviembre de 1961
            </h2>
            <p className="leading-relaxed text-slate-300">
              Fundación de la Facultad de Tecnología de la Universidad de La
              Habana. La Facultad de Tecnología quedó integrada por seis
              escuelas: Ingeniería Civil, Ingeniería Eléctrica, Ingeniería
              Industrial, Ingeniería Mecánica, Ingeniería Química y
              Arquitectura. Sus estudios, hasta ese momento con programas más o
              menos similares, se hacían cada vez más obsoletos, por lo que
              comenzaron a revolucionarse con cambios radicales, requeridos para
              dar respuestas a las necesidades económicas y sociales del país, a
              la altura de su tiempo.
            </p>
          </div>

          {/* Tarjeta 6 */}
          <div className="transform rounded-xl bg-slate-800 p-6 shadow-xl transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
            <h2 className="mb-4 text-2xl font-semibold text-cyan-400">
              2 de diciembre de 1964
            </h2>
            <p className="leading-relaxed text-slate-300">
              El Comandante en Jefe Fidel Castro inaugura, en La Habana, la
              Ciudad Universitaria José Antonio Echeverría (CUJAE), ocupando sus
              instalaciones la Facultad de Tecnología de la Universidad de La
              Habana y los cursos de nivelación, destinados a capacitar
              debidamente a los graduados de Bachillerato que aspiraban a
              estudiar carreras de ingenierías.
            </p>
          </div>

          {/* Tarjeta 7 */}
          <div className="transform rounded-xl bg-slate-800 p-6 shadow-xl transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50">
            <h2 className="mb-4 text-2xl font-semibold text-blue-400">
              29 de julio de 1976
            </h2>
            <p className="leading-relaxed text-slate-300">
              Se funda el Instituto Superior Politécnico José Antonio Echeverría
              por decisión del recién creado Ministerio de Educación Superior
              (MES), que promovió de inmediato una red nacional de Centros de
              Educación Superior (CES), como consecuencia del crecimiento de
              matrícula en las pocas universidades existentes y por justificada
              necesidad de perfeccionamiento del sistema nacional a ese nivel.
            </p>
          </div>

          {/* Tarjeta 8 */}
          <div className="transform rounded-xl bg-slate-800 p-6 shadow-xl transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50">
            <h2 className="mb-4 text-2xl font-semibold text-indigo-400">
              2 de diciembre de 2014
            </h2>
            <p className="leading-relaxed text-slate-300">
              50 Aniversario de la CUJAE. La Clasificación Mundial de
              Universidades QS (en inglés, QS World University Rankings) es una
              ordenación anual de 800 universidades del mundo dispuestas con un
              criterio de jerarquía. Publicada por Quacquarelli Symonds, es una
              clasificación sectorial, regional y, a la vez, global.
            </p>
            <p className="mt-4 leading-relaxed text-slate-300">
              <strong className="font-semibold text-indigo-300">
                Indicadores QS:
              </strong>{' '}
              QS utiliza ocho indicadores para calcular la puntuación de cada
              universidad. Estos indicadores miden la posición global en la
              comunidad académica, la productividad de la investigación, su
              impacto, empleabilidad y los esfuerzos por internacionalizarse.
            </p>
          </div>

          {/* Tarjeta 9 - Nuevo Evento */}
          <div className="transform rounded-xl bg-slate-800 p-6 shadow-xl transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
            <h2 className="mb-4 text-2xl font-semibold text-purple-400">
              04 de abril de 2025
            </h2>
            <h3 className="mb-2 text-xl font-medium text-slate-200">
              Inauguran en la Cujae laboratorio de inteligencia artificial
              Cuba-Rusia
            </h3>
            <p className="leading-relaxed text-slate-300">
              La Universidad Tecnológica de la Habana José Antonio Echeverría
              (Cujae) y la Universidad Federal del Sur de Rusia de conjunto con
              autoridades de ambos gobiernos inauguraron este jueves el
              Laboratorio Conjunto de Inteligencia Artificial Aplicada a las
              Ciencias Técnicas. Presidido por Airat Rinatovich Gatiyatov-
              viceministro de Ciencia y Enseñanza Superior de la Federación
              Rusa.
            </p>
          </div>
        </section>

        {/* Sección de Rankings Internacionales */}
        <section className="mt-16">
          <h2 className="mb-8 bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent">
            Rankings Internacionales
          </h2>
          <p className="mb-10 text-center text-lg text-slate-300">
            Se muestran solo los rankings internacionales que por sus
            características y parámetros son factibles para las universidades
            latinoamericanas y donde participa Cuba.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Ranking QS */}
            <div className="transform rounded-xl bg-slate-800 p-6 shadow-xl transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/50">
              <h3 className="mb-3 text-2xl font-semibold text-sky-400">
                QS World University Rankings
              </h3>
              <p className="mb-4 leading-relaxed text-slate-300">
                La Clasificación Mundial de Universidades QS (en inglés, QS
                World University Rankings) es una ordenación anual de 800
                universidades del mundo dispuestas con un criterio de jerarquía.
                Publicada por Quacquarelli Symonds, es una clasificación
                sectorial, regional y, a la vez, global. QS publica una
                clasificación regional, por ejemplo, el QS Asian University
                Ranking o el QS Latin American University Ranking, que son
                estudios independientes y llegan a conclusiones diferentes de
                las aportadas por la clasificación mundial global, gracias a los
                métodos empleados y a los criterios utilizados.
              </p>
              <p className="mb-1 text-sm text-slate-400">
                <strong>Página Web:</strong>{' '}
                <a
                  href="https://www.topuniversities.com/university-rankings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 transition-colors duration-300 hover:text-sky-300 hover:underline"
                >
                  topuniversities.com
                </a>
              </p>
              <p className="mb-1 text-sm text-slate-400">
                <strong>Siglas:</strong> QS
              </p>
              <p className="mb-1 text-sm text-slate-400">
                <strong>Instituciones Clasificadas:</strong> 800
              </p>
              <p className="mb-1 text-sm text-slate-400">
                <strong>Contacto:</strong> tusupport@qs.com
              </p>
              <p className="mb-4 text-sm text-slate-400">
                <strong>Periodicidad:</strong> Anual
              </p>
              <h4 className="mb-2 text-lg font-medium text-sky-300">
                Indicadores:
              </h4>
              <ul className="mb-4 list-inside list-disc space-y-1 text-sm text-slate-300">
                <li>Reputación académica (30%)</li>
                <li>Reputación entre empleadores (20%)</li>
                <li>Ratio de profesores/estudiantes (10%)</li>
                <li>Publicaciones por académico (5%)</li>
                <li>Citas por publicación (10%)</li>
                <li>Personal con doctorado (10%)</li>
                <li>Red internacional de investigación (10%)</li>
                <li>Impacto en línea (5%)</li>
              </ul>
              <h4 className="mb-2 text-lg font-medium text-sky-300">
                Posición CUJAE (2022):
              </h4>
              <ul className="list-inside list-disc space-y-1 text-sm text-slate-300">
                <li>Mundial: 1001-1200</li>
                <li>América Latina: 201-250</li>
                <li>Cuba: 4</li>
              </ul>
            </div>

            {/* Ranking SIR */}
            <div className="transform rounded-xl bg-slate-800 p-6 shadow-xl transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50">
              <h3 className="mb-3 text-2xl font-semibold text-emerald-400">
                SIR (SCImago Institutions Rankings) Iberoamericano
              </h3>
              <p className="mb-4 leading-relaxed text-slate-300">
                Desde el año 2009, SCImago Research Group (SRG) realiza el
                informe SCImago Institutions Rankings (SIR) como una herramienta
                de análisis para los procesos de evaluación y mejoramiento
                continuo de las instituciones...
              </p>
              <p className="mb-1 text-sm text-slate-400">
                <strong>Página Web:</strong>{' '}
                <a
                  href="https://www.scimagoir.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 transition-colors duration-300 hover:text-emerald-300 hover:underline"
                >
                  scimagoir.com
                </a>
              </p>
              <p className="mb-1 text-sm text-slate-400">
                <strong>Siglas:</strong> SIRIBER
              </p>
              <p className="mb-1 text-sm text-slate-400">
                <strong>Instituciones Clasificadas:</strong> 1771
              </p>
              <p className="mb-1 text-sm text-slate-400">
                <strong>Contacto:</strong> elena.corera@scimago.es
              </p>
              <p className="mb-4 text-sm text-slate-400">
                <strong>Periodicidad:</strong> Anual
              </p>
              <h4 className="mb-2 text-lg font-medium text-emerald-300">
                Indicadores:
              </h4>
              <p className="mb-1 text-sm text-slate-300">
                <strong>Investigación (50%):</strong> EwL (13%), NI (13%), O
                (8%), STP (5%), L (5%), IC (2%), Q1 (2%), Exc (2%).
              </p>
              <p className="mb-1 text-sm text-slate-300">
                <strong>Innovación (30%):</strong> IK (10%), TI (10%), PT (10%).
              </p>
              <p className="mb-4 text-sm text-slate-300">
                <strong>Impacto Social (20%):</strong> IL (15%), WS (5%).
              </p>
              <h4 className="mb-2 text-lg font-medium text-emerald-300">
                Posición CUJAE (2018):
              </h4>
              <ul className="list-inside list-disc space-y-1 text-sm text-slate-300">
                <li>Mundial: No</li>
                <li>América Latina: 256</li>
                <li>Cuba: 4</li>
              </ul>
            </div>

            {/* Ranking Webometrics */}
            <div className="transform rounded-xl bg-slate-800 p-6 shadow-xl transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50">
              <h3 className="mb-3 text-2xl font-semibold text-amber-400">
                Ranking Web of Universities (Webometrics)
              </h3>
              <p className="mb-4 leading-relaxed text-slate-300">
                El &quot;Ranking Mundial de Universidades en la Web&quot; es una
                iniciativa del Laboratorio de Cibermetría, que pertenece al
                Consejo Superior de Investigaciones Científicas (CSIC)...
              </p>
              <p className="mb-1 text-sm text-slate-400">
                <strong>Página Web:</strong>{' '}
                <a
                  href="https://www.webometrics.info/es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 transition-colors duration-300 hover:text-amber-300 hover:underline"
                >
                  webometrics.info
                </a>
              </p>
              <p className="mb-1 text-sm text-slate-400">
                <strong>Siglas:</strong> Webometrics
              </p>
              <p className="mb-1 text-sm text-slate-400">
                <strong>Instituciones Clasificadas:</strong> 21,000
              </p>
              <p className="mb-1 text-sm text-slate-400">
                <strong>Contacto:</strong> isidro.aguillo@cchs.csic.es
              </p>
              <p className="mb-4 text-sm text-slate-400">
                <strong>Periodicidad:</strong> Semestral
              </p>
              <h4 className="mb-2 text-lg font-medium text-amber-300">
                Indicadores:
              </h4>
              <p className="mb-1 text-sm text-slate-300">
                <strong>Visibilidad (50%):</strong> IMPACTO.
              </p>
              <p className="mb-4 text-sm text-slate-300">
                <strong>Actividad (50%):</strong> PRESENCIA (1/3), APERTURA
                (1/3), EXCELENCIA (1/3).
              </p>
              <h4 className="mb-2 text-lg font-medium text-amber-300">
                Posición CUJAE (Julio 2022):
              </h4>
              <ul className="list-inside list-disc space-y-1 text-sm text-slate-300">
                <li>Mundial: 4185</li>
                <li>América Latina: 338</li>
                <li>Cuba: 3</li>
              </ul>
            </div>

            {/* Transparent Ranking */}
            <div className="transform rounded-xl bg-slate-800 p-6 shadow-xl transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-fuchsia-500/50">
              <h3 className="mb-3 text-2xl font-semibold text-fuchsia-400">
                Transparent Ranking: Top Universities by Google Scholar
                Citations
              </h3>
              <p className="mb-4 leading-relaxed text-slate-300">
                Se recogen citas de los 10 mejores perfiles públicos del Google
                Académico de cada universidad...
              </p>
              <p className="mb-1 text-sm text-slate-400">
                <strong>Página Web:</strong>{' '}
                <a
                  href="https://www.webometrics.info/en/transparent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fuchsia-400 transition-colors duration-300 hover:text-fuchsia-300 hover:underline"
                >
                  webometrics.info/en/transparent
                </a>
              </p>
              <p className="mb-1 text-sm text-slate-400">
                <strong>Siglas:</strong> Top Universities by Google
              </p>
              <p className="mb-1 text-sm text-slate-400">
                <strong>Instituciones Clasificadas:</strong> 5000
              </p>
              <p className="mb-1 text-sm text-slate-400">
                <strong>Contacto:</strong> isidro.aguillo@cchs.csic.es
              </p>
              <p className="mb-4 text-sm text-slate-400">
                <strong>Periodicidad:</strong> Semestral
              </p>
              <h4 className="mb-2 text-lg font-medium text-fuchsia-300">
                Indicadores:
              </h4>
              <p className="mb-4 text-sm text-slate-300">
                Citas de los perfiles personales de los 10 mejores de cada
                universidad.
              </p>
              <h4 className="mb-2 text-lg font-medium text-fuchsia-300">
                Posición CUJAE (Enero 2019):
              </h4>
              <ul className="list-inside list-disc space-y-1 text-sm text-slate-300">
                <li>Mundial: No</li>
                <li>América Latina: No</li>
                <li>Cuba: 3</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HistoryPage;
