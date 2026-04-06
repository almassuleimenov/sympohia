"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Создаем минималистичный маркер в нашем фирменном стиле (темно-серый с белой обводкой)
// Это также решает частую проблему с пропавшими иконками Leaflet в Next.js
const customIcon = L.divIcon({
  className: "bg-graphite w-6 h-6 rounded-full border-4 border-offWhite shadow-lg",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export default function Map() {
  // Координаты ЖК (Широта и Долгота). 
  // Сейчас тут пример (центр города у воды). Позже ты сможешь вписать сюда реальные координаты!
  const position: [number, number] = [55.751244, 37.618423]; 

  return (
    <MapContainer 
      center={position} 
      zoom={14} 
      scrollWheelZoom={false} // Отключаем зум колесиком мыши, чтобы страница не "залипала" при скролле
      className="w-full h-full z-0"
    >
      {/* Используем специальную светлую (Light) тему карты для эстетики "Тихой роскоши" */}
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      
      {/* Наш маркер на карте */}
      <Marker position={position} icon={customIcon}>
        <Popup className="font-sans">
          <b className="font-serif text-lg tracking-wide">ЖК «Симфония»</b> <br /> 
          Искусство жить у воды.
        </Popup>
      </Marker>
    </MapContainer>
  );
}