import React, { useState } from 'react'
import countryList from './CountryList'

const Currency = () => {
    const [amount,Setamount]=useState(0)
    const [result,setResult]=useState(0)
    const [to,SetTo]=useState("INR")
    const [from,Setfrom]=useState("USD")


    

    function HandleClick(){
        async function Api() {
        const response=await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from.toLowerCase()}.json`);
        const data=await response.json();
        const rate=data[from.toLowerCase()][to.toLowerCase()]
        const finalAmount=amount*rate;
        setResult(finalAmount.toFixed(2));
         
    }
        Api();
    }


  return (
    <div className='flex items-center justify-center min-h-screen w-full  bg-slate-100'>
        <div className='w-full max-w-md md:max-w-xl border border-black flex flex-col items-center bg-white rounded-2xl shadow-lg p-6'>
            <h1 className='text-2xl sm:text-3xl  font-bold text-slate-800'>Currency Converter!</h1>
            <input  onChange={(e)=>Setamount(e.target.value)} value={amount} type='number' placeholder='Enter Here!' className='border border-slate-300 rounded-lg px-3 py-2 w-full mt-5'></input>
            <div className='gap-6 w-full mt-5 grid grid-cols-1 md:grid-cols-2'>
                <div>
                <p className='text-sm font-medium text-slate-600 mb-1'>
                from
                </p>
                <div className='flex border border-black rounded-xl'>
                <img className='shrink-0 w-8' src={`https://flagsapi.com/${countryList[from]}/flat/64.png`}></img>
                <select className='w-full min-w-0' value={from} onChange={(e)=>Setfrom(e.target.value)}> 
                    {Object.keys(countryList).map((e)=>(
                        <option key={e} value={e} >{e}</option>
                    ))}
                </select>
            </div>
            </div>
            <div>
            <p className='text-sm font-medium text-slate-600 mb-1'>
                to
                </p>
               <div className='flex border border-black rounded-xl mr-1'>
                <img className='shrink-0 w-8' src={`https://flagsapi.com/${countryList[to]}/flat/64.png`}></img>
                <select  className='w-full min-w-0' value={to} onChange={(e)=>SetTo(e.target.value)}>
                    {Object.keys(countryList).map((e)=>(
                        <option key={e} value={e} >{e}</option>
                    ))}
                </select>
            </div>
            </div>
            </div>
            <p className='mt-20 text-4xl font-extrabold text-slate-600'>{amount} {from} = {result} {to}</p>
            <button onClick={HandleClick} className='bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-6'>Get Exchange Value!!</button>
        </div>
    </div>
  )
}

export default Currency