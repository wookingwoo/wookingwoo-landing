import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

type Location = {
    country: string;
    lat: number;
    lng: number;
};

type TravelMapProps = {
    locations: Location[];
};

const mapContainerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 30,
    lng: 0,
};

const TravelMap = ({ locations }: TravelMapProps) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    });

    if (loadError) return <div className="text-center py-8">Error loading maps</div>;
    if (!isLoaded) return <div className="text-center py-8">Loading maps...</div>;

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
                {locations.map((location, index) => (
                    <Marker
                        key={index}
                        position={{ lat: location.lat, lng: location.lng }}
                        title={location.country}
                    />
                ))}
            </GoogleMap>
        </div>
    );
};

export default TravelMap; 