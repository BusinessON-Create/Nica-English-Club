import { useEffect, useRef, useState } from "react";
import { Excalidraw, serializeAsJSON } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { api } from "./api";
import logo from "./assets/logo.png";

const today = () => { const d = new Date(); return new Date(d - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10); };
const go = (h) => (location.hash = h);

function Shell({ title, meta, right, children }) {
  return (
    <div className="app">
      <header>
        <img src={logo} alt="" />
        <span className="brand">Nica English Club</span>
        {title && <span className="meta">· {title}</span>}
        <span className="sp" />
        {meta && <span className="st">{meta}</span>}
        {right}
      </header>
      {children}
    </div>
  );
}

// Excalidraw completo (todas las herramientas, librerías, imágenes, exportar...)
function Board({ scene, readOnly, onSave, setStatus }) {
  const last = useRef(""), timer = useRef();
  const change = (els, app, files) => {
    if (readOnly) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      if (!scene && !els.some((e) => !e.isDeleted)) return; // no guardar pizarra vacía
      const json = serializeAsJSON(els, app, files, "local");
      if (json === last.current) return;
      setStatus("Guardando…");
      try { await onSave(JSON.parse(json)); last.current = json; setStatus("Guardado ✓"); }
      catch (e) { setStatus("Error al guardar: " + e.message); }
    }, 2000);
  };
  return (
    <div className="board">
      <Excalidraw
        initialData={scene ? { ...scene, scrollToContent: true } : null}
        theme="dark"
        langCode="es-ES"
        viewModeEnabled={readOnly}
        onChange={change}
      />
    </div>
  );
}

function Student({ code }) {
  const [info, setInfo] = useState(), [date, setDate] = useState(), [data, setData] = useState(), [err, setErr] = useState();
  useEffect(() => {
    api("listDates", { code }).then((r) => { setInfo(r); setDate(r.dates.includes(today()) ? today() : r.dates[0]); }).catch((e) => setErr(e.message));
  }, [code]);
  useEffect(() => { if (date) { setData(); api("getClass", { code, fecha: date }).then(setData).catch((e) => setErr(e.message)); } }, [date, code]);
  if (err) return <Shell><div className="empty">{err}</div></Shell>;
  if (!info) return <Shell><div className="empty">Cargando…</div></Shell>;
  const picker = info.dates.length > 0 && (
    <select value={date} onChange={(e) => setDate(e.target.value)}>
      {info.dates.map((d) => <option key={d} value={d}>{d === today() ? "Hoy · " + d : d}</option>)}
    </select>
  );
  return (
    <Shell title={`${info.group.nombre} · ${info.group.horario}`} right={picker}>
      {!date ? <div className="empty">Aún no hay clases en este grupo.</div>
        : !data ? <div className="empty">Cargando clase…</div>
        : <Board key={date} scene={data.scene} readOnly />}
    </Shell>
  );
}

function Editor({ adminKey, gid, date }) {
  const [data, setData] = useState(), [st, setSt] = useState(), [err, setErr] = useState();
  useEffect(() => { api("getClass", { key: adminKey, groupId: gid, fecha: date }).then(setData).catch((e) => setErr(e.message)); }, [gid, date]);
  const back = <button onClick={() => go("#/admin")}>← Grupos</button>;
  if (err) return <Shell right={back}><div className="empty">{err}</div></Shell>;
  return (
    <Shell title={date} meta={st} right={back}>
      {!data ? <div className="empty">Cargando…</div>
        : <Board key={gid + date} scene={data.scene} setStatus={setSt}
            onSave={(scene) => api("saveClass", { key: adminKey, groupId: gid, fecha: date, scene })} />}
    </Shell>
  );
}

function Admin() {
  const [k, setK] = useState(sessionStorage.nec_key || ""), [ok, setOk] = useState(!!sessionStorage.nec_key);
  const [groups, setGroups] = useState([]), [err, setErr] = useState(), [f, setF] = useState({ nombre: "", horario: "" });
  const [dates, setDates] = useState({});
  const load = () => api("listGroups", { key: sessionStorage.nec_key }).then((r) => setGroups(r.groups)).catch((e) => { setErr(e.message); setOk(false); sessionStorage.removeItem("nec_key"); });
  useEffect(() => { if (ok) load(); }, [ok]);
  if (!ok) return (
    <Shell><div className="wrap"><div className="card"><h2>Acceso del maestro</h2>
      <div className="row"><input type="password" placeholder="Clave" value={k} onChange={(e) => setK(e.target.value)} />
      <button className="gold" onClick={() => { sessionStorage.nec_key = k; setOk(true); setErr(); }}>Entrar</button></div>
      {err && <p className="meta">{err}</p>}</div></div></Shell>
  );
  const link = (c) => `${location.origin}${location.pathname}#/g/${c}`;
  return (
    <Shell title="Panel del maestro">
      <div className="wrap">
        <div className="card"><h2>Nuevo horario</h2>
          <div className="row">
            <input placeholder="Nombre (ej. B1 Mañana)" value={f.nombre} onChange={(e) => setF({ ...f, nombre: e.target.value })} />
            <input placeholder="Horario (ej. L-M-V 8:00 am)" value={f.horario} onChange={(e) => setF({ ...f, horario: e.target.value })} />
            <button className="gold" disabled={!f.nombre} onClick={async () => { await api("createGroup", { key: sessionStorage.nec_key, ...f }); setF({ nombre: "", horario: "" }); load(); }}>Crear</button>
          </div></div>
        {groups.map((g) => (
          <div className="card" key={g.id}><h2>{g.nombre}</h2><span className="meta">{g.horario}</span>
            <div className="row">
              <button className="gold" onClick={() => go(`#/admin/${g.id}/${today()}`)}>Entrar a la clase de hoy</button>
              <input type="date" value={dates[g.id] || today()} onChange={(e) => setDates({ ...dates, [g.id]: e.target.value })} />
              <button onClick={() => go(`#/admin/${g.id}/${dates[g.id] || today()}`)}>Abrir fecha</button>
              <button onClick={() => { navigator.clipboard.writeText(link(g.code)); alert("Enlace de alumnos copiado"); }}>Copiar enlace alumnos</button>
            </div></div>
        ))}
      </div>
    </Shell>
  );
}

export default function App() {
  const [h, setH] = useState(location.hash);
  useEffect(() => { const f = () => setH(location.hash); addEventListener("hashchange", f); return () => removeEventListener("hashchange", f); }, []);
  const p = h.replace(/^#\/?/, "").split("/");
  if (p[0] === "g" && p[1]) return <Student code={p[1]} />;
  if (p[0] === "admin" && p[1] && p[2]) return <Editor adminKey={sessionStorage.nec_key} gid={p[1]} date={p[2]} />;
  if (p[0] === "admin") return <Admin />;
  return <Shell><div className="empty"><div>Abre el enlace de tu grupo para ver tu clase.<br /><br /><a href="#/admin">Soy maestro</a></div></div></Shell>;
}
