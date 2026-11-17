import React, { useState } from "react";
import countryList from "./CountryList";

const Currency = () => {
  const [amount, Setamount] = useState("");
  const [result, setResult] = useState(null);
  const [to, SetTo] = useState("INR");
  const [from, Setfrom] = useState("USD");
  const [isClicked, SetisClicked] = useState(false);
  const [isLoading, SetisLoading] = useState(false);


    function HandleReplace() {
    const temp = from;
    Setfrom(to);
    SetTo(temp);
  }

  function HandleLoading() {
    SetisLoading(true);
  }

  function HandleReset() {
    Setamount("");
    setResult(null);
    SetTo("INR");
    Setfrom("USD");
    SetisClicked(false);
    
  }
  function HandleClick() {
    SetisLoading(true);
    setTimeout(() => {
      async function Api() {
        const response = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from.toLowerCase()}.json`,
        );
        const data = await response.json();
        const rate = data[from.toLowerCase()][to.toLowerCase()];
        const finalAmount = Number(amount) * rate;
        
        setResult(finalAmount.toFixed(2));
        SetisLoading(false);
        SetisClicked(true); 
      }
      Api();
    }, 2000);
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full  bg-[#0F172A]">
      <div className="w-full max-w-md md:max-w-xl border border-black flex flex-col items-center bg-[#1E293B] rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl sm:text-3xl  font-bold text-[#F8FAFC]">
          Currency Converter!
        </h1>
        <input
          onChange={(e) => {
            Setamount(e.target.value);
            console.log(amount);
            SetisClicked(false);
          }}
          value={amount}
          
          type="number"
          placeholder="Enter Here!"
          className="border border-[#475569] rounded-lg px-3 py-2 w-full mt-5 bg-[#0F172A] placeholder-[#94A3B8] text-[#FFFFFF]"
        ></input>
        <div className="gap-6 w-full mt-5 grid grid-cols-1 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-[#CBD5E1] mb-1">from</p>
            <div className="flex border bg-[#0F172A] border-black rounded-xl">
              <img
                className="shrink-0 w-8"
                src={`https://flagsapi.com/${countryList[from]}/flat/64.png`}
              ></img>
              <select
                className="w-full min-w-0 bg-[#0F172A] text-[#FFFFFF]"
                value={from}
                onChange={(e) => Setfrom(e.target.value)}
              >
                {Object.keys(countryList).map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-[#CBD5E1] mb-1">to</p>
            <div className="flex border border-black bg-[#0F172A] rounded-xl mr-1">
              <img
                className="shrink-0 w-8"
                src={`https://flagsapi.com/${countryList[to]}/flat/64.png`}
              ></img>
              <select
                className="w-full min-w-0 bg-[#0F172A] text-[#FFFFFF]"
                value={to}
                onChange={(e) => SetTo(e.target.value)}
              >
                {Object.keys(countryList).map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            
          </div>
          
        </div>
        <div className="flex items-center justify-center gap-3 mt-5">
            <button onClick={HandleReplace} className="bg-[#3B82F6] text-white p-2 rounded-lg  transition mt-6">Replace Values</button>
        </div>
        {isLoading ? (
          <p className="mt-20 text-sm font-semibold text-center text-blue-600">
            Loading...
          </p>
        ) : isClicked ? (
          <p className="mt-20 text-4xl font-extrabold text-slate-600">
            {amount} {from} = {result} {to}
          </p>
        ) : (
          <p className="mt-20 text-sm font-medium text-center text-slate-600">
            Hit the button to get the exchange value!
          </p>
        )}

        <button
          onClick={HandleClick}
          className="bg-[#2563EB] text-white p-2 rounded-lg transition mt-6"
        >
          Get Exchange Value!!
        </button>
        <button
          onClick={HandleReset}
          className="bg-[#EF4444] text-white p-2 rounded-lg hover:bg-[#DC2626] transition mt-6"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Currency;
