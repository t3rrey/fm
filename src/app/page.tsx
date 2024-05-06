"use client";
import { Gear, PlusCircle, Sparkle, UserCircle } from "@phosphor-icons/react";
import { MapboxVectorLayer } from "ol-mapbox-style";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/WebGLTile.js";
import "ol/ol.css";
import OSM from "ol/source/OSM";
import React, { useEffect, useRef, useState } from "react";

const MapDisplay = ({ setMap }: { setMap: (map: Map) => void; map: Map }) => {
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialMap = new Map({
      target: mapDiv.current as HTMLElement,
      layers: [
        new MapboxVectorLayer({
          styleUrl: "mapbox://styles/lachlanterrey/clvuvdxfu00u601ob47m20d75",
          accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string,
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
    setMap(initialMap);
  }, []);

  return <div ref={mapDiv} className="w-screen h-screen" />;
};

const NavigationButton = (props: { icon: React.ReactNode }) => {
  return (
    <button className="rounded-xl p-2  hover:border-gray-700">
      {props.icon}
    </button>
  );
};

const NavigationSideBar: React.FC = () => {
  return (
    <div className="absolute shadow-lg bottom-0 left-0 bg-gray-100 rounded-tr-3xl space-y-4 h-2/5 flex flex-col p-2 justify-between">
      <div className="flex flex-col">
        {" "}
        <NavigationButton
          icon={
            <PlusCircle size={32} className="text-gray-700" weight="light" />
          }
        />
        <NavigationButton
          icon={<Sparkle size={32} className="text-gray-700" weight="light" />}
        />
      </div>

      <div className="flex flex-col">
        <NavigationButton
          icon={
            <UserCircle size={32} className="text-gray-700" weight="light" />
          }
        />
        <NavigationButton
          icon={<Gear size={32} className="text-gray-700" weight="light" />}
        />
      </div>
    </div>
  );
};

export default function Page() {
  const [map, setMap] = useState<Map>();

  useEffect(() => {
    const initialMap = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
    setMap(initialMap);
  }, []);

  return (
    <div>
      {map && <MapDisplay setMap={setMap} map={map} />}
      <NavigationSideBar />
    </div>
  );
}
