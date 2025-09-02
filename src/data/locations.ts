import brandPoster from "../assets/Figure n Fit.jpg";
export const BRAND_POSTER = brandPoster;

export type Location = {
  name: string;
  address: string;
  phone: string;
  mapEmbed: string; // Google Maps embed link
  hours: string[];
};

export const LOCATIONS: Location[] = [
  {
    name: "Figure ‘n Fit - Main Clinic",
    address: "202, 2nd Floor, Shree Complex, SG Highway, Ahmedabad, Gujarat, India",
    phone: "+91 98765 43210",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!...your_place_id...", // replace with your embed link
    hours: [
      "Mon – Sat: 10:00 AM – 7:00 PM",
      "Sunday: Closed",
    ],
  },
  {
    name: "Figure ‘n Fit - Satellite Center",
    address: "Shivranjani Cross Road, Ahmedabad, Gujarat, India",
    phone: "+91 98765 98765",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!...your_other_place_id...",
    hours: [
      "Mon – Sat: 11:00 AM – 6:00 PM",
      "Sunday: Closed",
    ],
  },
  // example location object
{
  name: "Station Branch, Surat",
  address: "...",
  phone: "99133 48004",
  hours: ["Mon–Sat 10:00–19:00"],
  mapEmbed: "...",
  poster: BRAND_POSTER, // NEW
}

];
