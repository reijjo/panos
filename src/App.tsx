import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [saldo, setSaldo] = useState<number | string>("");
  const [panos, setPanos] = useState<number | string>("");
  const [uusSaldo, setUusSaldo] = useState<number | string>("");
  const [pienempi, setPienempi] = useState<number>(0);
  const [extra, setExtra] = useState(false);

  const handleSaldo = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    if (!isNaN(Number(value))) {
      setSaldo(value);
    }
  };

  const handlePanos = (saldo: number) => {
    const paljon: number = Math.floor(Number(saldo) * 0.8 * 0.05);
    if (paljon < 1) {
      setPanos("Pitäs olla ainakin 25 €.");
    } else {
      setPanos(paljon + " €");
      setPienempi(paljon - 1);
      setUusSaldo(Math.floor(Number(paljon - 1) / (0.8 * 0.05)));
      setExtra(true);
    }
    setSaldo("");
  };

  return (
    <>
      <div className="the">
        <div className="grid-container">
          <div style={{ gridColumn: "1 / span 2" }}>
            <p>Paljon saldo?</p>
            <div style={{ display: "flex" }} className="eka">
              <input
                style={{ padding: "6px", marginRight: "2rem", flexGrow: "1" }}
                type="text"
                name="saldo"
                value={saldo}
                onChange={handleSaldo}
              />
              <button
                className="nappi"
                type="submit"
                name="nappi"
                onClick={() => handlePanos(Number(saldo))}
              >
                Panos?
              </button>
            </div>
          </div>
          <div
            style={{
              gridColumn: "1 / span 2",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {panos ? <h2>{panos}</h2> : null}
          </div>
          {extra && pienempi >= 1 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gridColumn: "1 / span 2",
              }}
            >
              <p>
                Kun alle {uusSaldo} saldoo PANOS ON {pienempi} €
              </p>
              <button
                className="nappi"
                onClick={() => {
                  setSaldo("");
                  setPanos("");
                  setUusSaldo("");
                  setPienempi(0);
                  setExtra(false);
                }}
              >
                laske uusiks
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default App;
