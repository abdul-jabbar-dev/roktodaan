function getFormattedAddress(donor) {
    console.log(donor)
    // 1. প্রথমে চেক করুন donor অবজেক্ট এবং address অবজেক্ট আছে কি না।
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