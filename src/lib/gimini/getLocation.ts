import URLS from "@/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 💡 AI Client
const aiClient = new GoogleGenerativeAI(URLS.GOOGLE_API_KEY);

export const getCoordsFromAI = async ({
  address,
  id,
}: {
  address: string;
  id: string;
}): Promise<{
  id: string;
  latitude?: number;
  longitude?: number;
  area?: [number, number][]; // polygon
}> => {
  const result: {
    id: string;
    latitude?: number;
    longitude?: number;
    area?: [number, number][];
  } = { id };

  try {
    const model = aiClient.getGenerativeModel({ model: "gemini-2.5-flash" });

    const request = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a geolocation assistant.
Return the coordinates for the area or location: "${address}".
If it's a specific place (like a shop, school, etc.), return one point:
{
 "latitude": 23.8103,
 "longitude": 90.4125
}

If it's a larger region or area (like a neighborhood, city, or island),
return multiple coordinates (polygon) as an array:
{
 "area": [
   [23.8103, 90.4125],
   [23.8110, 90.4150],
   [23.8095, 90.4160]
 ]
}

Respond ONLY with valid JSON. No explanations.`,
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
      },
    };

    const response = await model.generateContent(request);
    const rawText = response.response.text();
    const coord = JSON.parse(rawText);

    // ✅ handle single or area
    if (coord.latitude && coord.longitude) {
      result.latitude = coord.latitude;
      result.longitude = coord.longitude;
    } else if (coord.area && Array.isArray(coord.area)) {
      result.area = coord.area;
    }

    return result;
  } catch (error) {
    console.error("AI coordinate error:", error);
    return { id, latitude: undefined, longitude: undefined };
  }
};
