/* ==========================================================
   BASE DE DATOS DE VERBOS
   Formato irregulares: infinitivo|pasado|participio|traducción|ejemplo|ejemplo ES[|gerundio|3ra persona]
   Formato regulares:   infinitivo|traducción|ejemplo|ejemplo ES
   Un "+" al final del infinitivo duplica la consonante final (stop → stopped / stopping).
   Pasado, gerundio y 3ra persona de los regulares se calculan solos.
   Para agregar un verbo, añade una línea al bloque que corresponda.
   ========================================================== */
const IRREGULAR = `
be|was/were|been|Ser o Estar|I want to be a pilot.|Quiero ser piloto.|being|Is/Am/Are
become|became|become|Convertirse en|He became a lawyer.|Se convirtió en abogado.
begin+|began|begun|Empezar|The class begins at eight.|La clase comienza a las ocho.
beat|beat|beaten|Vencer|We beat them yesterday.|Los vencimos ayer.
bend|bent|bent|Doblar|Bend your knees.|Dobla las rodillas.
bet+|bet|bet|Apostar|I bet you are right.|Apuesto a que tienes razón.
bite|bit|bitten|Morder|The dog bit him.|El perro lo mordió.
blow|blew|blown|Soplar|Blow out the candles.|Sopla las velas.
break|broke|broken|Romper|He broke his arm.|Se rompió el brazo.
bring|brought|brought|Traer|Bring your laptop.|Trae tu computadora.
build|built|built|Construir|They built a new stadium.|Construyeron un estadio.
buy|bought|bought|Comprar|I bought a car.|Compré un coche.
catch|caught|caught|Atrapar|Catch the ball.|Atrapa la pelota.
choose|chose|chosen|Elegir|Choose the best option.|Elige la mejor opción.
come|came|come|Venir|Can you come here?|¿Puedes venir aquí?
cost|cost|cost|Costar|It costs ten dollars.|Cuesta diez dólares.
cut+|cut|cut|Cortar|Cut the paper.|Corta el papel.
deal|dealt|dealt|Tratar / Lidiar|I deal with clients.|Trato con clientes.
dig+|dug|dug|Cavar|They dug a hole.|Cavaron un hoyo.
do|did|done|Hacer (acción)|Do your homework.|Haz tu tarea.
draw|drew|drawn|Dibujar|She draws well.|Ella dibuja bien.
drink|drank|drunk|Beber|She drinks tea.|Ella bebe té.
drive|drove|driven|Conducir|He drives a truck.|Él conduce un camión.
eat|ate|eaten|Comer|We ate sushi.|Comimos sushi.
fall|fell|fallen|Caer|Leaves fall in autumn.|Las hojas caen en otoño.
feed|fed|fed|Alimentar|Feed the dog.|Alimenta al perro.
feel|felt|felt|Sentir|I feel tired.|Me siento cansado.
fight|fought|fought|Pelear|They fought yesterday.|Pelearon ayer.
find|found|found|Encontrar|I found my keys.|Encontré mis llaves.
fly|flew|flown|Volar|Birds fly south.|Las aves vuelan al sur.
forget+|forgot|forgotten|Olvidar|I forgot the milk.|Olvidé la leche.
forgive|forgave|forgiven|Perdonar|I forgive you.|Te perdono.
freeze|froze|frozen|Congelar|The water froze.|El agua se congeló.
get+|got|gotten|Obtener|I got a promotion.|Obtuve un ascenso.
give|gave|given|Dar|Give me the remote.|Dame el control.
go|went|gone|Ir|She went to the cinema.|Fue al cine.
grow|grew|grown|Crecer|Plants grow fast.|Las plantas crecen rápido.
hang|hung|hung|Colgar|Hang your coat here.|Cuelga tu abrigo aquí.
have|had|had|Tener|I have two sisters.|Tengo dos hermanas.|having|Has
hear|heard|heard|Oír|Did you hear that?|¿Oíste eso?
hide|hid|hidden|Esconder|They hid the treasure.|Escondieron el tesoro.
hit+|hit|hit|Golpear|He hit the ball.|Golpeó la pelota.
hold|held|held|Sostener|Hold the line.|Manténgase en la línea.
hurt|hurt|hurt|Doler / Lastimar|My head hurts.|Me duele la cabeza.
keep|kept|kept|Mantener|Keep your promise.|Mantén tu promesa.
know|knew|known|Saber|I know the answer.|Sé la respuesta.
lead|led|led|Guiar|She leads the team.|Ella guía al equipo.
leave|left|left|Salir|The train leaves soon.|El tren sale pronto.
lend|lent|lent|Prestar|Lend me your pen.|Préstame tu bolígrafo.
let+|let|let|Permitir / Dejar|Let me help you.|Déjame ayudarte.
light|lit|lit|Encender|Light the candle.|Enciende la vela.
lose|lost|lost|Perder|I lost my wallet.|Perdí mi cartera.
make|made|made|Hacer (crear)|She made a cake.|Hizo un pastel.
mean|meant|meant|Significar|What does this mean?|¿Qué significa esto?
meet|met|met|Conocer|We met at work.|Nos conocimos en el trabajo.
oversleep|overslept|overslept|Quedarse dormido|I overslept today.|Hoy me quedé dormido.
pay|paid|paid|Pagar|I paid for the tickets.|Pagué los boletos.
put+|put|put|Poner|Put it on the table.|Ponlo en la mesa.
quit+|quit|quit|Renunciar|He quit his job.|Renunció a su trabajo.
read|read|read|Leer|I read every day.|Leo cada día.
rebuild|rebuilt|rebuilt|Reconstruir|They rebuilt the bridge.|Reconstruyeron el puente.
rewrite|rewrote|rewritten|Reescribir|Rewrite your essay.|Reescribe tu ensayo.
ride|rode|ridden|Montar|I ride a bike.|Monto bicicleta.
ring|rang|rung|Sonar (timbre)|The phone rang.|El teléfono sonó.
rise|rose|risen|Elevarse|The sun rises early.|El sol sale temprano.
run+|ran|run|Correr|He runs every morning.|Corre cada mañana.
say|said|said|Decir|What did he say?|¿Qué dijo él?
see|saw|seen|Ver|I saw a great movie.|Vi una gran película.
seek|sought|sought|Buscar (formal)|They seek new talent.|Buscan nuevo talento.
sell|sold|sold|Vender|They sell bread.|Venden pan.
send|sent|sent|Enviar|I sent a message.|Envié un mensaje.
set+|set|set|Establecer|Set the alarm.|Pon la alarma.
shake|shook|shaken|Sacudir|Shake the bottle.|Agita la botella.
shine|shone|shone|Brillar|The sun shines.|El sol brilla.
shoot|shot|shot|Tirar / Disparar|He shot the ball into the net.|Metió el balón en la red.
show|showed|shown|Mostrar|Show me the photo.|Muéstrame la foto.
shut+|shut|shut|Cerrar (de golpe)|Shut the window.|Cierra la ventana.
sing|sang|sung|Cantar|She sings well.|Canta bien.
sink|sank|sunk|Hundirse|The boat sank.|El barco se hundió.
sit+|sat|sat|Sentarse|Please sit down.|Siéntate por favor.
sleep|slept|slept|Dormir|The baby is sleeping.|El bebé duerme.
slide|slid|slid|Deslizar|The kids slide down.|Los niños se deslizan.
speak|spoke|spoken|Hablar|Do you speak English?|¿Hablas inglés?
spend|spent|spent|Gastar|I spent a lot of money.|Gasté mucho dinero.
split+|split|split|Dividir (partir)|Let's split the bill.|Dividamos la cuenta.
spread|spread|spread|Esparcir|Spread the butter.|Unta la mantequilla.
stand|stood|stood|Estar de pie|He stood for an hour.|Estuvo parado una hora.
steal|stole|stolen|Robar|Someone stole my bike.|Robaron mi bici.
stick|stuck|stuck|Pegar|Stick it on the wall.|Pégalo en la pared.
sweep|swept|swept|Barrer|Sweep the floor.|Barre el piso.
swim+|swam|swum|Nadar|I love to swim.|Me encanta nadar.
take|took|taken|Tomar|Take a deep breath.|Toma aire profundo.
teach|taught|taught|Enseñar|He teaches math.|Enseña matemáticas.
tear|tore|torn|Rasgar|Don't tear the paper.|No rasgues el papel.
tell|told|told|Contar|Tell me the truth.|Dime la verdad.
think|thought|thought|Pensar|I think it will rain.|Creo que lloverá.
throw|threw|thrown|Lanzar|Throw me the ball.|Lánzame la pelota.
undo|undid|undone|Deshacer|Undo the last step.|Deshaz el último paso.
understand|understood|understood|Entender|I don't understand.|No entiendo.
wake|woke|woken|Despertar|I wake up at six.|Despierto a las seis.
wear|wore|worn|Usar (ropa)|She wears glasses.|Usa gafas.
win+|won|won|Ganar|We won the game.|Ganamos el juego.
write|wrote|written|Escribir|Write your name.|Escribe tu nombre.
`;

const REGULAR = `
accept|Aceptar|I accept your offer.|Acepto tu oferta.
add|Añadir|Add some salt.|Añade un poco de sal.
agree|Estar de acuerdo|I agree with you.|Estoy de acuerdo contigo.
allow|Permitir|Pets are not allowed.|Mascotas no permitidas.
answer|Contestar|Answer the phone.|Contesta el teléfono.
apply|Solicitar|I applied for a job.|Solicité un empleo.
arrive|Llegar|The bus arrives at nine.|El bus llega a las nueve.
ask|Preguntar|Ask for help.|Pide ayuda.
attend|Asistir|I attend class daily.|Asisto a clase a diario.
avoid|Evitar|Avoid the traffic.|Evita el tráfico.
bake|Hornear|She baked a cake.|Horneó un pastel.
believe|Creer|I believe in you.|Creo en ti.
borrow|Pedir prestado|Can I borrow a pen?|¿Puedo pedir prestado un lápiz?
brush|Cepillar|Brush your teeth.|Cepíllate los dientes.
burn|Quemar|Don't burn the toast.|No quemes el pan tostado.
call|Llamar|Call me later.|Llámame luego.
cancel|Cancelar|They canceled the meeting.|Cancelaron la reunión.
carry|Llevar en brazos|I carry my backpack.|Cargo mi mochila.
celebrate|Celebrar|We celebrate her birthday.|Celebramos su cumpleaños.
change|Cambiar|Everything changes.|Todo cambia.
charge|Cargar (batería)|Charge your phone.|Carga tu teléfono.
chat+|Charlar|We chat every night.|Charlamos cada noche.
check|Revisar|Check your email.|Revisa tu correo.
clean|Limpiar|Clean your room.|Limpia tu cuarto.
click|Hacer clic|Click the green button.|Haz clic en el botón verde.
climb|Escalar|They climbed the hill.|Escalaron la colina.
close|Cerrar|Close the door.|Cierra la puerta.
collect|Coleccionar|He collects stamps.|Colecciona sellos.
compare|Comparar|Compare the prices.|Compara los precios.
complete|Completar|Complete the form.|Completa el formulario.
continue|Continuar|Continue reading.|Continúa leyendo.
cook|Cocinar|I love cooking.|Amo cocinar.
copy|Copiar|Don't copy me.|No me copies.
count|Contar (números)|Count to ten.|Cuenta hasta diez.
cover|Cubrir|Cover the pot.|Tapa la olla.
create|Crear|She creates videos.|Ella crea videos.
cross|Cruzar|Cross the street.|Cruza la calle.
cry|Llorar|The baby cries.|El bebé llora.
dance|Bailar|They dance well.|Bailan bien.
decide|Decidir|I decided to study.|Decidí estudiar.
delete|Borrar|Delete the old files.|Borra los archivos viejos.
deliver|Entregar|They deliver food.|Entregan comida.
depend|Depender|It depends on you.|Depende de ti.
describe|Describir|Describe your day.|Describe tu día.
design|Diseñar|He designs logos.|Él diseña logos.
destroy|Destruir|The storm destroyed the roof.|La tormenta destruyó el techo.
develop|Desarrollar|We develop apps.|Desarrollamos aplicaciones.
die|Morir|The plant died.|La planta murió.
discuss|Debatir|Let's discuss the plan.|Debatamos el plan.
divide|Dividir|Divide it by two.|Divídelo entre dos.
download|Descargar|Download the app.|Descarga la aplicación.
drop+|Soltar|I dropped my phone.|Se me cayó el teléfono.
dry|Secar|Dry your hands.|Sécate las manos.
earn|Ganar (dinero)|She earns good money.|Ella gana buen dinero.
end|Finalizar|The movie ends soon.|La película termina pronto.
enjoy|Disfrutar|Enjoy the food.|Disfruta la comida.
enter|Entrar|Enter the room.|Entra al cuarto.
escape|Escapar|The bird escaped.|El pájaro escapó.
exercise|Hacer ejercicio|I exercise daily.|Hago ejercicio a diario.
expect|Esperar (algo)|I expect a call.|Espero una llamada.
explain|Explicar|Explain it to me.|Explícamelo.
fail|Reprobar|Don't fail the test.|No repruebes el examen.
fill|Llenar|Fill the glass.|Llena el vaso.
finish|Terminar|I finished my work.|Terminé mi trabajo.
fix|Arreglar|He fixed my phone.|Arregló mi teléfono.
fold|Doblar (ropa)|Fold the clothes.|Dobla la ropa.
follow|Seguir|Follow me.|Sígueme.
fry|Freír|Fry the eggs.|Fríe los huevos.
gather|Reunir|Gather your things.|Reúne tus cosas.
grab+|Agarrar|Grab your coat.|Agarra tu abrigo.
greet|Saludar|Greet the guests.|Saluda a los invitados.
guess|Adivinar|Guess the answer.|Adivina la respuesta.
handle|Manejar (situación)|She handles stress well.|Ella maneja bien el estrés.
happen|Suceder|What happened?|¿Qué pasó?
hate|Odiar|I hate waiting.|Odio esperar.
help|Ayudar|Can you help me?|¿Puedes ayudarme?
hope|Esperar (deseo)|I hope you win.|Espero que ganes.
hug+|Abrazar|She hugged her mom.|Abrazó a su mamá.
hurry|Apurarse|Hurry up!|¡Apúrate!
imagine|Imaginar|Imagine a big house.|Imagina una casa grande.
improve|Mejorar|I want to improve.|Quiero mejorar.
include|Incluir|The price includes tax.|El precio incluye impuestos.
invent|Inventar|He invented a game.|Inventó un juego.
invite|Invitar|I invited my friends.|Invité a mis amigos.
jump|Saltar|Jump high.|Salta alto.
kick|Patear|He kicked the ball.|Pateó la pelota.
kill|Matar|He killed a fly.|Mató una mosca.
kiss|Besar|She kissed him.|Ella lo besó.
knock|Tocar (la puerta)|Knock on the door.|Toca la puerta.
laugh|Reír|They laughed.|Ellos rieron.
learn|Aprender|I learn every day.|Aprendo cada día.
like|Gustar|I like pizza.|Me gusta la pizza.
lift|Levantar|Lift the box.|Levanta la caja.
listen|Escuchar|Listen to me.|Escúchame.
live|Vivir|I live here.|Vivo aquí.
lock|Cerrar con llave|Lock the door.|Cierra la puerta con llave.
look|Mirar|Look at this.|Mira esto.
love|Amar|I love you.|Te amo.
manage|Administrar|She manages a store.|Ella administra una tienda.
marry|Casarse|They married in June.|Se casaron en junio.
measure|Medir|Measure the table.|Mide la mesa.
mention|Mencionar|Don't mention it.|No lo menciones.
miss|Extrañar|I miss my family.|Extraño a mi familia.
mix|Mezclar|Mix the colors.|Mezcla los colores.
move|Mover|Move that chair.|Mueve esa silla.
name|Nombrar|They named the dog Max.|Nombraron al perro Max.
need|Necesitar|I need help.|Necesito ayuda.
notice|Notar|I noticed a mistake.|Noté un error.
obey|Obedecer|Obey the rules.|Obedece las reglas.
offer|Ofrecer|They offered me a job.|Me ofrecieron un trabajo.
open|Abrir|Open the box.|Abre la caja.
order|Pedir (ordenar)|I ordered a pizza.|Pedí una pizza.
organize|Organizar|Organize your desk.|Organiza tu escritorio.
own|Poseer|She owns a shop.|Ella es dueña de una tienda.
pack|Empacar|Pack your bag.|Empaca tu bolso.
paint|Pintar|He paints walls.|Él pinta paredes.
park|Estacionar|Park here.|Estaciona aquí.
pass|Pasar (entregar)|Pass the salt.|Pasa la sal.
pick|Escoger|Pick a card.|Escoge una carta.
plan+|Planear|We plan a trip.|Planeamos un viaje.
plant|Plantar|Plant a tree.|Planta un árbol.
play|Jugar|I play baseball.|Juego béisbol.
pour|Verter|Pour the milk.|Vierte la leche.
practice|Practicar|Practice every day.|Practica todos los días.
pray|Rezar|They pray daily.|Rezan a diario.
prefer+|Preferir|I prefer coffee.|Prefiero el café.
prepare|Preparar|Prepare your notes.|Prepara tus notas.
press|Presionar|Press the button.|Presiona el botón.
produce|Producir|The farm produces milk.|La finca produce leche.
promise|Prometer|I promise.|Lo prometo.
protect|Proteger|Protect your phone.|Protege tu teléfono.
provide|Brindar|We provide training.|Brindamos entrenamiento.
pull|Jalar|Pull the door.|Jala la puerta.
push|Empujar|Push the cart.|Empuja el carrito.
rain|Llover|It's raining.|Está lloviendo.
reach|Alcanzar|I reached the top.|Llegué a la cima.
receive|Recibir|I received your message.|Recibí tu mensaje.
record|Grabar|Record your voice.|Graba tu voz.
reduce|Reducir|Reduce the noise.|Reduce el ruido.
relax|Relajarse|Relax and breathe.|Relájate y respira.
remember|Recordar|I remember you.|Te recuerdo.
remind|Recordar (a alguien)|Remind me, please.|Recuérdame, por favor.
remove|Quitar|Remove your shoes.|Quítate los zapatos.
rent|Alquilar|We rent a house.|Alquilamos una casa.
repair|Reparar|He repairs cars.|Él repara carros.
repeat|Repetir|Repeat after me.|Repite después de mí.
reply|Responder|Reply to my email.|Responde mi correo.
rescue|Rescatar|They rescued a dog.|Rescataron a un perro.
rest|Descansar|Rest for a while.|Descansa un rato.
return|Regresar|Return at five.|Regresa a las cinco.
roll|Rodar|The ball rolled away.|La pelota rodó lejos.
save|Guardar|Save your money.|Ahorra tu dinero.
search|Buscar|Search online.|Busca en internet.
serve|Servir|They serve coffee.|Sirven café.
share|Compartir|Share your ideas.|Comparte tus ideas.
shop+|Ir de compras|I shop on weekends.|Voy de compras los fines de semana.
shout|Gritar|Don't shout.|No grites.
sign|Firmar|Sign here.|Firma aquí.
skip+|Saltarse|Don't skip class.|No te saltes la clase.
smile|Sonreír|Smile please.|Sonríe por favor.
solve|Resolver|Solve the problem.|Resuelve el problema.
sound|Sonar (parecer)|That sounds great.|Eso suena genial.
start|Comenzar|Start now.|Empieza ahora.
stay|Quedarse|Stay with me.|Quédate conmigo.
stir+|Revolver|Stir the soup.|Revuelve la sopa.
stop+|Detener|Stop now.|Para ahora.
study|Estudiar|Study hard.|Estudia duro.
succeed|Tener éxito|You will succeed.|Tendrás éxito.
suggest|Sugerir|I suggest a break.|Sugiero un descanso.
surprise|Sorprender|You surprised me.|Me sorprendiste.
switch|Cambiar de|Switch the lights off.|Apaga las luces.
talk|Conversar|Talk to her.|Habla con ella.
taste|Probar (sabor)|Taste the soup.|Prueba la sopa.
text|Enviar mensaje|Text me later.|Escríbeme luego.
thank|Agradecer|Thank you.|Gracias.
touch|Tocar|Don't touch it.|No lo toques.
train|Entrenar|We train daily.|Entrenamos a diario.
travel|Viajar|I travel a lot.|Viajo mucho.
trust|Confiar|I trust you.|Confío en ti.
try|Intentar|Try again.|Inténtalo otra vez.
turn|Girar|Turn left.|Gira a la izquierda.
type|Teclear|Type your name.|Teclea tu nombre.
use|Usar|Use this.|Usa esto.
visit|Visitar|Visit us.|Visítanos.
vote|Votar|We vote on Sunday.|Votamos el domingo.
wait|Esperar|Wait for me.|Espérame.
walk|Caminar|Walk fast.|Camina rápido.
want|Querer|I want water.|Quiero agua.
warn|Advertir|I warned him.|Le advertí.
wash|Lavar|Wash the car.|Lava el carro.
waste|Desperdiciar|Don't waste time.|No pierdas tiempo.
watch|Observar|Watch this.|Mira esto.
whisper|Susurrar|Don't whisper.|No susurres.
wish|Desear|I wish you luck.|Te deseo suerte.
wonder|Preguntarse|I wonder why.|Me pregunto por qué.
work|Trabajar|I work hard.|Trabajo duro.
worry|Preocuparse|Don't worry.|No te preocupes.
wrap+|Envolver|Wrap the gift.|Envuelve el regalo.
`;
