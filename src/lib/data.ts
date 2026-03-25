export interface WeddingData {
  couple: {
    partner1: { firstName: string; lastName: string };
    partner2: { firstName: string; lastName: string };
  };
  date: {
    ceremony: string;
    reception: string;
  };
  venue: {
    ceremony: {
      name: string;
      address: string;
      coordinates: { lat: number; lng: number };
    };
    reception: {
      name: string;
      address: string;
      coordinates: { lat: number; lng: number };
    };
  };
  tagline: string;
  story: string;
  timeline: {
    time: string;
    title: string;
    description: string;
    icon: string;
  }[];
  gallery: {
    src: string;
    alt: string;
    caption: string;
  }[];
  rsvp: {
    deadline: string;
    questions: {
      id: string;
      type: string;
      label: string;
      placeholder?: string;
      options?: string[];
    }[];
  };
  dressCode: string;
  hashtag: string;
}

export async function getWeddingData(): Promise<WeddingData> {
  const res = await fetch("/wedding-data.json");
  return res.json();
}

export function getCountdown(targetDate: string) {
  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export function formatCoordinates(lat: number, lng: number): string {
  const latDir = lat >= 0 ? "N" : "S";
  const lngDir = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}°${latDir} ${Math.abs(lng).toFixed(4)}°${lngDir}`;
}
