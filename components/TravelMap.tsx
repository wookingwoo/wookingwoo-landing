import React, { useEffect, useMemo, useState } from 'react';
import { GoogleMap, useLoadScript, Polygon } from '@react-google-maps/api';

type Location = {
    country: string;
    lat: number;
    lng: number;
};

type TravelMapProps = {
    locations: Location[];
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

const TravelMap = ({ locations }: TravelMapProps) => {
    const [countryData, setCountryData] = useState<CountryData | null>(null);
    const visitedCountries = useMemo(
        () => new Set(locations.map(location => location.country)),
        [locations]
    );

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    });

    useEffect(() => {
        fetch('/countries.geo.json')
            .then(response => response.json())
            .then((data: CountryData) => {
                setCountryData(data);
            })
            .catch(error => {
                console.error('Error loading GeoJSON data:', error);
            });
    }, []);

    if (loadError) return <div className="text-center py-8">Error loading maps</div>;
    if (!isLoaded) return <div className="text-center py-8">Loading maps...</div>;

    const formatCoordinates = (coordinates: LinearRing) =>
        coordinates.map(([lng, lat]) => ({ lat, lng }));

    return (
        <div className="rounded-lg overflow-hidden shadow-lg">
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
                {/* Render country polygons */}
                {countryData?.features.map((feature, featureIndex) => {

                    // Check if this country has been visited
                    const isVisited = visitedCountries.has(feature.properties.ADMIN);

                    if (isVisited && feature.geometry.type === 'Polygon') {
                        return (
                            <Polygon
                                key={`polygon-${featureIndex}`}
                                paths={formatCoordinates(feature.geometry.coordinates[0])}
                                options={{
                                    fillColor: '#4285F4',
                                    fillOpacity: 0.6,
                                    strokeColor: '#4285F4',
                                    strokeOpacity: 1,
                                    strokeWeight: 1
                                }}
                            />
                        );
                    } else if (isVisited && feature.geometry.type === 'MultiPolygon') {
                        return feature.geometry.coordinates.map((polygon, polygonIndex) => (
                            <Polygon
                                key={`multipolygon-${featureIndex}-${polygonIndex}`}
                                paths={formatCoordinates(polygon[0])}
                                options={{
                                    fillColor: '#4285F4',
                                    fillOpacity: 0.6,
                                    strokeColor: '#4285F4',
                                    strokeOpacity: 1,
                                    strokeWeight: 1
                                }}
                            />
                        ));
                    }
                    return null;
                })}

                {/* Render location markers */}
                {/* {locations.map((location, index) => (
                    <Marker
                        key={index}
                        position={{ lat: location.lat, lng: location.lng }}
                        title={location.country}
                    />
                ))} */}
            </GoogleMap>
        </div>
    );
};

export default TravelMap;
