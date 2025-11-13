function getFormattedAddress(donor: any) {
     if (!donor || !donor.address) {
        return "Address information missing.";
    }

    const address = donor.address;
 
    const formattedAddress = address.area
        ? `${address.area}, ${address.upazila}, ${address.division}`
        : `${address.upazila}, ${address.division}`;

    return formattedAddress;
}
export default getFormattedAddress