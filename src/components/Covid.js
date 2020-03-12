import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import "moment/locale/es";

const Covid = () => {
  const [confirmed, setConfirmed] = useState("");
  const [recovered, setRecovered] = useState("");
  const [deaths, setDeaths] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await fetch(`https://covid19.mathdro.id/api/countries/ES`)
        .then(res => res.json())
        .catch(err => setError(err));

      setConfirmed(data.confirmed.value);
      setRecovered(data.recovered.value);
      setDeaths(data.deaths.value);
      setLastUpdate(data.lastUpdate);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <span>
      {loading && <h1>Cargando ...</h1>}
      <h1>Casos COVID-19 ESPAÑA</h1>
      Confirmados: <span className="text-primary">{confirmed}</span>
      <br />
      Recuperados: {recovered}
      <br />
      Fallecidos: <span className="text-danger">{deaths}</span>
      <br />
      Actualizado:{" "}
      <Moment fromNow locale="es">
        {lastUpdate}
      </Moment>
    </span>
  );
};

export default Covid;
