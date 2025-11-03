import { useState, useEffect } from "react";
import { Division, District, Upazila } from "@/types/location/destination";

export function useLocationSelect(step5Address: {
  division: string;
  district: string;
  upazila: string;
}) {
  const [division, setDivision] = useState<Division[]>([]);
  const [district, setDistrict] = useState<District[]>([]);
  const [upazila, setUpazila] = useState<Upazila[]>([]);

  const [selectedDivision, setSelectedDivision] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [selectedUpazila, setSelectedUpazila] = useState<{
    id: number;
    name: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/location/division.json")
      .then((res) => res.json())
      .then(setDivision);
    fetch("/api/location/districts.json")
      .then((res) => res.json())
      .then(setDistrict);
    fetch("/api/location/upazila.json")
      .then((res) => res.json())
      .then(setUpazila);
  }, []);

  useEffect(() => {
    if (division.length && step5Address?.division) {
      const match = division.find(
        (d) =>
          d.name === step5Address.division ||
          d.name === step5Address.division
      );
      if (match) setSelectedDivision({ id: match.id, name: match.name });
    }
  }, [division, step5Address?.division]);

  useEffect(() => {
    if (district.length && step5Address?.district) {
      const match = district.find(
        (d) =>
          d.name === step5Address.district ||
          d.name === step5Address.district
      );
      if (match) setSelectedDistrict({ id: match.id, name: match.name });
    }
  }, [district, step5Address?.district]);

  useEffect(() => {
    if (upazila.length && step5Address?.upazila) {
      const match = upazila.find(
        (u) =>
          u.name === step5Address.upazila || u.name === step5Address.upazila
      );
      if (match) setSelectedUpazila({ id: match.id, name: match.name });
    }
  }, [upazila, step5Address?.upazila]);

  return {
    division,
    district,
    upazila,
    selectedDivision,
    setSelectedDivision,
    selectedDistrict,
    setSelectedDistrict,
    selectedUpazila,
    setSelectedUpazila,
  };
}
