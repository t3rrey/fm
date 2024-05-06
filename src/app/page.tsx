"use client";
import {
  Gear,
  PaperPlaneTilt,
  PlusCircle,
  Sparkle,
  UserCircle,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { MapboxVectorLayer } from "ol-mapbox-style";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/WebGLTile.js";
import "ol/ol.css";
import OSM from "ol/source/OSM";
import { ReactNode, useEffect, useRef, useState } from "react";

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
        zoom: 7,
      }),
    });
    setMap(initialMap);
  }, []);

  return <div ref={mapDiv} className={`w-full h-screen`} />;
};

const NavigationButton = ({
  icon,
  onClick,
}: {
  icon: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button className="rounded-xl p-2  hover:border-gray-700" onClick={onClick}>
      {icon}
    </button>
  );
};

const ExpandedSideBar = ({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}) => {
  return (
    <div className="h-screen w-[400px] bg-gray-100 border-r flex-shrink-0">
      <button onClick={() => setShowSidebar(!showSidebar)}></button>
    </div>
  );
};

const NavigationSideBar = ({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}) => {
  return (
    <div
      className={clsx(
        "absolute bottom-0 bg-gray-100 rounded-tr-3xl  h-2/5 flex flex-col p-2 justify-between",
        showSidebar ? "left-[400px]" : "left-0 shadow-lg"
      )}
    >
      <div className="flex flex-col space-y-2">
        <NavigationButton
          onClick={() => setShowSidebar(!showSidebar)}
          icon={
            <PlusCircle size={32} className="text-gray-700" weight="light" />
          }
        />
        <NavigationButton
          icon={<Sparkle size={32} className="text-gray-700" weight="light" />}
        />
        <NavigationButton
          icon={
            <PaperPlaneTilt
              size={32}
              className="text-gray-700"
              weight="light"
            />
          }
        />
      </div>
      <div className="flex flex-col space-y-2">
        <NavigationButton
          icon={
            <UserCircle
              size={32}
              className="text-gray-700 hover:text-orange-500 hover:weight-duotone"
              weight="duotone"
            />
          }
        />
        <NavigationButton
          icon={
            <Gear
              size={32}
              className="text-gray-700 hover:text-orange-500 hover:weight-duotone"
              weight="light"
            />
          }
        />
      </div>
    </div>
  );
};

export default function Page() {
  const [map, setMap] = useState<Map>();
  const [showSidebar, setShowSidebar] = useState(false);

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

  useEffect(() => {
    if (map) {
      map.updateSize();
    }
  }, [map, showSidebar]);

  return (
    <div className="w-full h-screen flex">
      {showSidebar && (
        <ExpandedSideBar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      )}
      {map && <MapDisplay setMap={setMap} map={map} />}
      <NavigationSideBar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
    </div>
  );
}
