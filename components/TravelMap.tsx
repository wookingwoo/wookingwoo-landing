import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, Polygon } from '@react-google-maps/api';

type Location = {
    country: string;
    lat: number;
    lng: number;
};

type TravelMapProps = {
    locations: Location[];
};

type CountryData = {
    type: string;
    features: {
        type: string;
        properties: {
            ADMIN: string;
        };
        geometry: {
            type: string;
            coordinates: any[];
        };
    }[];
};

const mapContainerStyle = {
    width: '100%',
    height: '252px',
};

const center = {
    lat: 30,
    lng: 0,
};

const TravelMap = ({ locations }: TravelMapProps) => {
    const [countryData, setCountryData] = useState<CountryData | null>(null);
    const [visitedCountries, setVisitedCountries] = useState<string[]>([]);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    });

    useEffect(() => {
        // Extract country names from locations
        const countries = locations.map(loc => loc.country);
        setVisitedCountries(countries);

        // Load GeoJSON data
        fetch('/countries.geo.json')
            .then(response => response.json())
            .then(data => {
                setCountryData(data);
            })
            .catch(error => {
                console.error('Error loading GeoJSON data:', error);
            });
    }, [locations]);

    if (loadError) return <div className="text-center py-8">Error loading maps</div>;
    if (!isLoaded) return <div className="text-center py-8">Loading maps...</div>;

    // Function to format coordinates for Google Maps Polygon
    const formatCoordinates = (coordinates: any[]) => {
        if (!coordinates || coordinates.length === 0) return [];

        // Handle different geometry types
        if (coordinates[0][0] && typeof coordinates[0][0] === 'number') {
            // Simple polygon
            return coordinates.map(coord => ({ lat: coord[1], lng: coord[0] }));
        } else {
            // MultiPolygon or complex polygon with holes
            return coordinates[0].map(coord => ({ lat: coord[1], lng: coord[0] }));
        }
    };

    return (
        <div className="rounded-lg overflow-hidden shadow-lg">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={2}
                center={center}
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
                    const isVisited = visitedCountries.includes(feature.properties.ADMIN);

                    if (isVisited && feature.geometry.type === 'Polygon') {
                        return (
                            <Polygon
                                key={`polygon-${featureIndex}`}
                                paths={formatCoordinates(feature.geometry.coordinates)}
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
                                paths={formatCoordinates([polygon[0]])}
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