import { useEffect, useState } from "react";
import Prayer from "./Component/Prayer.jsx";

function App() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [dateTime, setDateTime] = useState("");
  const [city, setCity] = useState("Cairo");
  const [country, setCountry] = useState("EG");
  const [cities, setCities] = useState([]);

  const countries = [
    { name: "مصر", code: "EG" },
    { name: "السعودية", code: "SA" },
    { name: "الأردن", code: "JO" },
    { name: "الإمارات", code: "AE" },
    { name: "العراق", code: "IQ" },
    { name: "المغرب", code: "MA" },
    { name: "تونس", code: "TN" },
    { name: "الجزائر", code: "DZ" },
    { name: "سلطنة عمان", code: "OM" },
    { name: "البحرين", code: "BH" },
  ];

  const citiesByCountry = {
    EG: [
      "القاهرة",
      "الإسكندرية",
      "الجيزة",
      "المنصورة",
      "أسوان",
      "الأقصر",
      "طنطا",
    ],
    SA: ["الرياض", "جدة", "مكة", "المدينة", "الدمام", "الخبر", "أبها"],
    JO: ["عمان", "إربد", "الزرقاء", "جرش", "الكرك", "الطفيلة", "مادبا"],
    AE: ["دبي", "أبوظبي", "الشارقة", "عجمان", "رأس الخيمة", "الفجيرة", "العين"],
    IQ: ["بغداد", "البصرة", "أربيل", "كربلاء", "النجف", "السليمانية", "ديالى"],
    MA: ["الدار البيضاء", "مراكش", "فاس", "طنجة", "أكادير", "الرباط", "تطوان"],
    TN: ["تونس", "سوسة", "صفاقس", "قابس", "المهدية", "نابل", "جندوبة"],
    DZ: [
      "الجزائر العاصمة",
      "وهران",
      "قسنطينة",
      "عنابة",
      "باتنة",
      "بلعباس",
      "تبسة",
    ],
    OM: ["مسقط", "صلالة", "نظرا", "البريمي", "صحار", "السويق", "بركاء"],
    BH: [
      "المنامة",
      "محرق",
      "الحد",
      "سترة",
      "الرفاع",
      "ديار المحرق",
      "بلد القديم",
    ],
  };

  useEffect(() => {
    const fetchCities = () => {
      setCities(citiesByCountry[country]);
      setCity(citiesByCountry[country][0]); // تعيين المدينة الأولى كخيار افتراضي
    };

    fetchCities();
  }, [country]);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`
        );
        const dataPrayer = await response.json();

        setPrayerTimes(dataPrayer.data.timings);
        setDateTime(dataPrayer.data.date.gregorian.date);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrayerTimes();
  }, [city, country]);

  const formatTime = (time) => {
    if (!time) {
      return "00:00";
    }

    let [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
  };

  return (
    <section>
      <div className="container">
        <div className="top_sec">
          <div className="country">
            <h3>الدولة</h3>
            <select onChange={(e) => setCountry(e.target.value)}>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="city">
            <h3>المدينة</h3>
            <select onChange={(e) => setCity(e.target.value)}>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="date">
            <h3>التاريخ</h3>
            <h4>{dateTime}</h4>
          </div>
        </div>

        <Prayer name={"الفجر"} time={formatTime(prayerTimes.Fajr)} />
        <Prayer name={"الظهر"} time={formatTime(prayerTimes.Dhuhr)} />
        <Prayer name={"العصر"} time={formatTime(prayerTimes.Asr)} />
        <Prayer name={"المغرب"} time={formatTime(prayerTimes.Maghrib)} />
        <Prayer name={"العشاء"} time={formatTime(prayerTimes.Isha)} />
      </div>
    </section>
  );
}

export default App;
