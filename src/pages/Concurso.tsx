import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Concurso = () => {
  return (
    <>
      <Helmet>
        <title>Concurso 11ONCE - Te Invitamos a Miami</title>
        <meta
          name="description"
          content="Participa en el concurso de 11ONCE y gana pasajes a Miami. Compra por $20.000 o más y obtén tu cupón de participación."
        />
        <meta name="keywords" content="concurso 11once, ganar viaje miami, pasajes aereos, sorteo 11once" />
        <link rel="canonical" href="https://11once.cl/concurso" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <br></br>
            <br></br>
            <h1 className="font-display text-4xl md:text-5xl text-primary text-center mb-8">
              11ONCE TE INVITA A MIAMI
            </h1>

            <div className="bg-card border border-border rounded-lg p-8 mb-8">
              <h2 className="font-heading text-2xl text-foreground mb-6">Bases Legales del Concurso</h2>

              <div className="space-y-6 text-white">
                <div>
                  <h3 className="font-heading text-xl text-primary mb-2">PRIMERO: ORGANIZADOR</h3>
                  <p>El presente concurso es organizado por Merch Burguer Ltda., nombre de fantasía 11once, en adelante "el Organizador".</p>
                </div>

                <div>
                  <h3 className="font-heading text-xl text-primary mb-2">SEGUNDO: NOMBRE DEL CONCURSO</h3>
                  <p>El concurso se denomina "11once te invita a Miami".</p>
                </div>

                <div>
                  <h3 className="font-heading text-xl text-primary mb-2">TERCERO: VIGENCIA Y LUGAR</h3>
                  <p>El concurso tendrá vigencia desde el 09 de enero hasta el 11 de marzo, ambas fechas inclusive.</p>
                  <p>El sorteo se realizará el día 11 de marzo, a las 21:00 horas, en el local del Organizador ubicado en Chorrillos N° 775, y será transmitido en vivo a través de la red social Instagram.</p>
                </div>

                <div>
                  <h3 className="font-heading text-xl text-primary mb-2">CUARTO: PARTICIPANTES</h3>
                  <p>Podrán participar todas las personas naturales, mayores de 18 años, que cuenten con cédula de identidad chilena vigente.</p>
                  <p>No podrán participar trabajadores del Organizador, ni sus familiares directos hasta el segundo grado de consanguinidad o afinidad.</p>
                </div>

                <div>
                  <h3 className="font-heading text-xl text-primary mb-2">QUINTO: MECÁNICA DEL CONCURSO</h3>
                  <p>Para participar en el concurso, los interesados deberán realizar una compra mínima de $20.000 (veinte mil pesos chilenos) en el local del Organizador, dentro del período de vigencia del concurso.</p>
                  <p>Cada compra que cumpla con el monto mínimo señalado dará derecho a un cupón de participación, el cual deberá ser completado correctamente con datos verídicos, claros y legibles.</p>
                  <p>Se establece expresamente un límite máximo de un cupón por persona por día, con independencia del número de compras que realice el participante durante esa misma jornada.</p>
                  <p>El cupón deberá ser depositado dentro del plazo de vigencia del concurso en el lugar habilitado por el Organizador.</p>
                  <p>No se aceptarán cupones asociados a compras inferiores al monto mínimo establecido, ni cupones que excedan el límite diario permitido. Asimismo, la entrega de datos falsos, incompletos, ilegibles o el incumplimiento de cualquiera de las condiciones señaladas facultará al Organizador para excluir al participante del concurso, sin derecho a reclamo alguno.</p>
                </div>

                <div>
                  <h3 className="font-heading text-xl text-primary mb-2">SEXTO: PREMIO</h3>
                  <p>Un ganador recibirá como premio dos pasajes aéreos ida y vuelta Santiago–Miami–Santiago, para el ganador y un acompañante.</p>
                  <p>El premio no incluye estadía, traslados internos, alimentación, seguros de viaje, visas, impuestos, gastos personales ni ningún otro gasto adicional no señalado expresamente en estas bases.</p>
                  <p>El premio no es transferible ni canjeable por dinero.</p>
                </div>

                <div>
                  <h3 className="font-heading text-xl text-primary mb-2">SÉPTIMO: CONDICIONES DEL PREMIO</h3>
                  <p>El ganador deberá hacerse presente y contactar formalmente al Organizador dentro de un plazo máximo de cinco días hábiles contados desde la fecha del sorteo. El no cumplimiento de este requisito facultará al Organizador para dejar sin efecto el premio, sin derecho a compensación alguna.</p>
                  <p>El ganador dispondrá de un plazo máximo de un año contado desde la fecha del sorteo para definir y realizar el viaje, debiendo seleccionar las fechas exactas de ida y regreso dentro de dicho período.</p>
                  <p>Dentro de un plazo máximo de un mes contado desde la fecha del sorteo, el ganador deberá confirmar formalmente su intención de hacer uso del premio, requisito indispensable para mantener la validez del mismo.</p>
                  <p>Una vez definidas las fechas del viaje, el ganador deberá confirmar la fecha exacta de salida con una anticipación mínima de un mes respecto de la fecha programada de viaje, a fin de permitir la correcta coordinación, reserva y emisión de los pasajes aéreos.</p>
                  <p>La estadía en Estados Unidos tendrá una permanencia máxima de un mes, no pudiendo exceder dicho plazo bajo ninguna circunstancia.</p>
                  <p>El incumplimiento de cualquiera de los plazos, requisitos o condiciones señaladas en el presente artículo facultará al Organizador para dejar sin efecto el premio, sin que ello genere derecho a indemnización, compensación ni reclamo alguno por parte del ganador.</p>
                  <p>Los requisitos migratorios, pasaporte vigente, visas, autorizaciones, permisos y cualquier exigencia impuesta por autoridades nacionales o extranjeras serán de responsabilidad exclusiva del ganador y su acompañante.</p>
                </div>

                <div>
                  <h3 className="font-heading text-xl text-primary mb-2">OCTAVO: SORTEO</h3>
                  <p>El sorteo se realizará de forma aleatoria entre todos los cupones válidamente emitidos.</p>
                  <p>El Organizador podrá extraer previamente hasta dos (2) cupones demostrativos con fines de transparencia, los cuales no otorgarán derecho a premio.</p>
                  <p>Posteriormente, se extraerá el cupón ganador.</p>
                </div>

                <div>
                  <h3 className="font-heading text-xl text-primary mb-2">NOVENO: RESPONSABILIDAD</h3>
                  <p>El Organizador no será responsable por cancelaciones, reprogramaciones, retrasos, fuerza mayor, caso fortuito, decisiones de aerolíneas o de autoridades migratorias que impidan o afecten el uso del premio.</p>
                </div>

                <div>
                  <h3 className="font-heading text-xl text-primary mb-2">DÉCIMO: USO DE IMAGEN</h3>
                  <p>El ganador autoriza expresamente al Organizador a utilizar su nombre, imagen y testimonio con fines promocionales y publicitarios relacionados con el concurso, sin derecho a compensación económica adicional.</p>
                </div>

                <div>
                  <h3 className="font-heading text-xl text-primary mb-2">DÉCIMO PRIMERO: ACEPTACIÓN DE BASES</h3>
                  <p>La participación en el concurso implica la aceptación total e irrevocable de las presentes bases legales.</p>
                </div>

                <div>
                  <h3 className="font-heading text-xl text-primary mb-2">DÉCIMO SEGUNDO: PROTOCOLIZACIÓN</h3>
                  <p>Las presentes bases legales serán protocolizadas ante notario público, para todos los efectos legales a que haya lugar.</p>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-heading text-xl text-primary mb-2">FIRMA ORGANIZADOR</h3>
                  <p><strong>Representante legal:</strong> Iván Alejandro Huerta Vera</p>
                  <p><strong>RUT:</strong> 13855330-2</p>
                  <p><strong>Razón Social:</strong> Merchburguer Limitada.</p>
                  <p><strong>RUT:</strong> 78231461-0</p>
                  <p><strong>Nombre de Fantasía:</strong> 11once</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-white text-lg mb-4">
                ¡No pierdas la oportunidad de ganar un viaje a Miami!
              </p>
              <p className="text-white">
                Visítanos en Chorrillos 775, Quilpué y participa con tu compra.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Concurso;