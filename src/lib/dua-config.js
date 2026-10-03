// ডেভেলপমেন্টের জন্য jsDelivr CDN। কাজ না করলে নিচের raw লিংক ব্যবহার করো:
// "https://raw.githubusercontent.com/islamicapi/masnun-dua/main/audio"
export const AUDIO_BASE =
  "https://cdn.jsdelivr.net/gh/islamicapi/masnun-dua@main/audio";

export const audioUrl = (id) => `${AUDIO_BASE}/${id}.mp3`;