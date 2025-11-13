import BloodGroup from "@/types/blood/group";

export const mapBloodGroupEnumToLabel = (Enum: BloodGroup|null|undefined) => {
   if (typeof Enum !== 'string') return 'No Blood Group '
  const mapping: Record<string, string> = {
     "A_POS":"A+",
     "A_NEG":"A-",
     "B_POS":"B+",
     "B_NEG":"B-",
     "O_POS":"O+",
     "O_NEG":"O-",
     "AB_POS":"AB+",
     "AB_NEG":"AB-",
  };

  return mapping[Enum ];
};
 
export const mapBloodGroupLebelToEnum = (Enum: BloodGroup|null|undefined) => {
   if (typeof Enum !== 'string') return 'No Blood Group '
  const mapping: Record<string, string> = {
     "A+":"A_POS",
     "A-":"A_NEG",
     "B+":"B_POS",
     "B-":"B_NEG",
     "O+":"O_POS",
     "O-":"O_NEG",
     "AB+":"AB_POS",
     "AB-":"AB_NEG",
  };

  return mapping[Enum ];
};
 