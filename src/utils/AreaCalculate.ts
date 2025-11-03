export const getAreaNameOSM = async (lat: number, lon: number) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=16&addressdetails=1&accept-language=bn`;

  const adminLevels = {
    division: null as string | null,
    district: null as string | null,
    upazila: null as string | null,
    town: null as string | null,
  };

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Roktodaan/1.0 (contact@roktodaan.com)" },
    });
    const data = await res.json();
    if (!data?.address) return adminLevels;

    const addr = data.address;
    adminLevels.division = addr.state || null;
    adminLevels.district = addr.county || addr.district || null;
    adminLevels.upazila = addr.suburb || addr.village || null;
    adminLevels.town = addr.town || addr.city || null;

    return adminLevels;
  } catch (err) {
    console.error("💥 OSM reverse error:", err);
    return adminLevels;
  }
};

export const getLatLonByArea = async (address: string) => {
  const query = encodeURIComponent(`${address}`);
  const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

  const defaultLocation = {
    lat: null as number | null,
    lon: null as number | null,
  };

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Roktodaan/1.0 (contact@roktodaan.com)" },
    });

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();

    if (!data?.length) {
      console.warn(`⚠️ No coordinates found for: ${address}`);
      return defaultLocation;
    }

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
    };
  } catch (err) {
    console.error("💥 OSM search error:", err);
    return defaultLocation;
  }
};
