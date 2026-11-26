export default function sitemap() {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ).replace(/\/+$/, "");

  const cars = [1, 2, 3, 4, 5, 6];

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/fleet`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...cars.map((id) => ({
      url: `${baseUrl}/cars/${id}`,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  ];
}