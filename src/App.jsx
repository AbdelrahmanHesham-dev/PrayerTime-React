import { useEffect } from "react";
import Prayer from "./Component/Prayer.jsx";
import { useState } from "react";

function App() {

  const [PrayerTimes , setPrayerTimes] = useState({})
  const [dateTime , setDateTime] = useState("")
  const [city , setCity] = useState("Cairo")

  const citys = [
    { name: "القاهرة", value: "Cairo" },
    { name: "الاسكندريه", value: "Alexandria" },
    { name: "الجيزه", value: "Giza" },
    { name: "المنصوره", value: "Mansoura" },
    { name: "أسوان", value: "Aswan" },
    { name: "الأقصر", value: "Luxor" },
  ];


  useEffect(() => {
    const fetchPrayerTimes = async () =>{
      try{
        const response = await fetch(`https:/api.aladhan.com/v1/timingsByCity?city=Eg&country=${city}`)
        const data_Prayer = await response.json()

        setPrayerTimes(data_Prayer.data.timings)
        setDateTime(data_Prayer.data.date.gregorian.date)

      } catch(error){
        console.error(error)
      }
    }

    fetchPrayerTimes()
  },[city])

  const formatTime = (time) => {
    if(!time){
      return "00:00"
    }
      
    let [hours , minutes] = time.split(":").map(Number)
    const perd = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${perd}`
  }

  return (
    <section>
      <div className="container">
        <div className="top_sec">
          <div className="city">
            <h3>المدينه</h3>

            <select name="" id="" onChange={(e) => setCity(e.target.value)}>
              {citys.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className="date">
            <h3>التاريخ</h3>
            <h4>{dateTime}</h4>
          </div>
        </div>

        <Prayer name={"الفجر"} time={formatTime(PrayerTimes.Fajr)} />
        <Prayer name={"الظهر"} time={formatTime(PrayerTimes.Dhuhr)} />
        <Prayer name={"العصر"} time={formatTime(PrayerTimes.Asr)} />
        <Prayer name={"المغرب"} time={formatTime(PrayerTimes.Maghrib)} />
        <Prayer name={"العشاء"} time={formatTime(PrayerTimes.Isha)} />
      </div>
    </section>
  );
}

export default App;
