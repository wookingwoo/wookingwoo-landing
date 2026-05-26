import React, { useEffect, useMemo, useState } from 'react';
import { GoogleMap, useLoadScript, Polygon } from '@react-google-maps/api';
import type { TravelLocation } from '../data/types';

type TravelMapProps = {
    locations: TravelLocation[];
};

type Coordinate = [lng: number, lat: number];
type LinearRing = Coordinate[];
type PolygonCoordinates = LinearRing[];
type MultiPolygonCoordinates = PolygonCoordinates[];

type CountryFeature = {
    type: string;
    properties: {
        ADMIN: string;
    };
    geometry:
        | {
            type: 'Polygon';
            coordinates: PolygonCoordinates;
        }
        | {
            type: 'MultiPolygon';
            coordinates: MultiPolygonCoordinates;
        };
};

type CountryData = {
    type: string;
    features: CountryFeature[];
};

const mapContainerStyle = {
    width: '100%',
    height: '252px',
};

const southKoreaPosition = {
    lat: 35.9078,
    lng: 127.7669,
};

const VisitedCountriesFallback = ({ locations }: TravelMapProps) => (
    <div className="rounded-lg border border-gray-100 bg-gray-100 p-4 shadow-inner dark:border-slate-700/70 dark:bg-slate-800/80 dark:shadow-black/30 dark:ring-1 dark:ring-white/5">
        <p className="mb-3 text-sm font-medium text-gray-700 dark:text-slate-200">
            Visited countries
        </p>
        <div className="flex flex-wrap gap-2">
            {locations.map(location => (
                <span
                    key={location.country}
                    className="rounded-full bg-white px-3 py-1 text-sm text-gray-700 shadow-sm dark:bg-sky-400/10 dark:text-sky-200 dark:ring-1 dark:ring-sky-300/10"
                >
                    {location.country}
                </span>
            ))}
        </div>
    </div>
);

type GoogleTravelMapProps = TravelMapProps & {
    googleMapsApiKey: string;
};

const GoogleTravelMap = ({ locations, googleMapsApiKey }: GoogleTravelMapProps) => {
    const [countryData, setCountryData] = useState<CountryData | null>(null);
    const visitedCountries = useMemo(
        () => new Set(locations.map(location => location.country)),
        [locations]
    );

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey,
    });

    useEffect(() => {
        const controller = new AbortController();

        fetch('/countries.geo.json', { signal: controller.signal })
            .then(response => response.json())
            .then((data: CountryData) => {
                setCountryData(data);
            })
            .catch(error => {
                if (error instanceof DOMException && error.name === 'AbortError') {
                    return;
                }

                console.error('Error loading GeoJSON data:', error);
            });

        return () => controller.abort();
    }, []);

    if (loadError) return <VisitedCountriesFallback locations={locations} />;
    if (!isLoaded) return <div className="py-8 text-center dark:text-slate-300" role="status">Loading maps...</div>;

    const formatCoordinates = (coordinates: LinearRing) =>
        coordinates.map(([lng, lat]) => ({ lat, lng }));

    const renderVisitedPolygon = (linearRing: LinearRing | undefined, key: string) => {
        if (!linearRing) {
            return null;
        }

        return (
            <Polygon
                key={key}
                paths={formatCoordinates(linearRing)}
                options={{
                    fillColor: '#4285F4',
                    fillOpacity: 0.6,
                    strokeColor: '#4285F4',
                    strokeOpacity: 1,
                    strokeWeight: 1,
                }}
            />
        );
    };

    return (
        <div className="overflow-hidden rounded-lg shadow-lg dark:border dark:border-slate-700/70 dark:bg-slate-800/80 dark:shadow-black/30 dark:ring-1 dark:ring-white/5">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={2}
                center={southKoreaPosition}
                options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                    styles: [
                        {
                            featureType: 'water',
                            elementType: 'geometry',
                            stylers: [{ color: '#e9e9e9' }, { lightness: 17 }],
                        },
                        {
                            featureType: 'landscape',
                            elementType: 'geometry',
                            stylers: [{ color: '#f5f5f5' }, { lightness: 20 }],
                        },
                    ],
                }}
            >
                {countryData?.features.map((feature, featureIndex) => {
                    const isVisited = visitedCountries.has(feature.properties.ADMIN);

                    if (isVisited && feature.geometry.type === 'Polygon') {
                        return renderVisitedPolygon(
                            feature.geometry.coordinates[0],
                            `polygon-${featureIndex}`
                        );
                    } else if (isVisited && feature.geometry.type === 'MultiPolygon') {
                        return feature.geometry.coordinates.map((polygon, polygonIndex) => (
                            renderVisitedPolygon(
                                polygon[0],
                                `multipolygon-${featureIndex}-${polygonIndex}`
                            )
                        ));
                    }
                    return null;
                })}

            </GoogleMap>
        </div>
    );
};

const TravelMap = ({ locations }: TravelMapProps) => {
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!googleMapsApiKey) {
        return <VisitedCountriesFallback locations={locations} />;
    }

    return <GoogleTravelMap locations={locations} googleMapsApiKey={googleMapsApiKey} />;
};

export default TravelMap;
