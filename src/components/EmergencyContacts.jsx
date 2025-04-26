import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Phone, MapPin, AlertTriangle } from 'lucide-react';

const EmergencyContacts = () => {
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Haversine formula to calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const commonEmergencyNumbers = [
    { name: 'Emergency Services', number: '112', description: 'All emergency services' },
    { name: 'Police', number: '100', description: 'Police emergency' },
    { name: 'Ambulance', number: '108', description: 'Medical emergency' },
    { name: 'Fire Department', number: '101', description: 'Fire emergency' },
    { name: 'Women Helpline', number: '1091', description: 'Women safety' },
    { name: 'Child Helpline', number: '1098', description: 'Child protection' },
  ];

  const getNearbyHospitals = async (pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        
        const query = `
          [out:json];
          (
            node["amenity"="hospital"](around:5000,${latitude},${longitude});
            way["amenity"="hospital"](around:5000,${latitude},${longitude});
            relation["amenity"="hospital"](around:5000,${latitude},${longitude});
          );
          out center;
        `;

        const response = await fetch('https://overpass-api.de/api/interpreter', {
          method: 'POST',
          body: query,
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch nearby hospitals');
        }

        const data = await response.json();
        const hospitals = data.elements.map((element) => ({
          id: element.id,
          name: element.tags?.name || "Unnamed Hospital",
          lat: element.lat || element.center?.lat,
          lon: element.lon || element.center?.lon,
          address: element.tags?.['addr:full'] || element.tags?.['addr:street'] || 'Address not available',
          phone: element.tags?.phone || element.tags?.['contact:phone'] || 'Contact not available',
          distance: calculateDistance(
            latitude,
            longitude,
            element.lat || element.center?.lat,
            element.lon || element.center?.lon
          ).toFixed(1)
        }));

        // Sort hospitals by distance
        hospitals.sort((a, b) => a.distance - b.distance);

        const startIndex = (pageNum - 1) * 10;
        const endIndex = startIndex + 10;
        const paginatedHospitals = hospitals.slice(startIndex, endIndex);

        if (pageNum === 1) {
          setNearbyHospitals(paginatedHospitals);
        } else {
          setNearbyHospitals(prev => [...prev, ...paginatedHospitals]);
        }

        setHasMore(endIndex < hospitals.length);
        setLoading(false);
      }, () => {
        setError('Location access denied');
        setLoading(false);
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      getNearbyHospitals(page + 1);
    }
  };

  useEffect(() => {
    getNearbyHospitals(1);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="w-full shadow-lg rounded-2xl overflow-hidden">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Common Emergency Numbers */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="text-xl font-semibold text-gray-800">Emergency Numbers</h3>
              </div>
              <div className="grid grid-cols-1 gap-3 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                {commonEmergencyNumbers.map((contact) => (
                  <div
                    key={contact.number}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <div className="space-y-1 mb-3 sm:mb-0">
                      <p className="font-semibold text-lg text-gray-800">{contact.name}</p>
                      <p className="text-sm text-gray-500">{contact.description}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-colors w-full sm:w-auto justify-center"
                      onClick={() => window.location.href = `tel:${contact.number}`}
                    >
                      <Phone className="w-4 h-4" />
                      {contact.number}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Hospitals */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-800">Nearby Hospitals</h3>
              </div>
              <div className="max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                {loading && page === 1 ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : error ? (
                  <div className="text-center space-y-4 p-4">
                    <p className="text-red-500">{error}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => getNearbyHospitals(1)}
                      className="hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      Try Again
                    </Button>
                  </div>
                ) : nearbyHospitals.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 gap-4">
                      {nearbyHospitals.map((hospital) => (
                        <div
                          key={hospital.id}
                          className="p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                        >
                          <div className="space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                              <p className="font-semibold text-lg text-gray-800">{hospital.name}</p>
                              <span className="text-sm text-gray-800 bg-blue-200 px-3 py-1 rounded-full whitespace-nowrap">
                                {hospital.distance} km away
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">{hospital.address}</p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gray-500" />
                                <a
                                  href={`tel:${hospital.phone}`}
                                  className="text-blue-600 hover:underline text-sm"
                                >
                                  {hospital.phone}
                                </a>
                              </div>
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${hospital.lat},${hospital.lon}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm inline-flex items-center gap-1"
                              >
                                <MapPin className="w-4 h-4" />
                                View on Map
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {hasMore && (
                      <div className="mt-6 text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={loadMore}
                          disabled={loading}
                          className="hover:bg-blue-600 hover:text-white transition-colors"
                        >
                          {loading ? (
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                              Loading...
                            </div>
                          ) : (
                            'Load More'
                          )}
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-32">
                    <p className="text-muted-foreground">No hospitals found nearby</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyContacts;
