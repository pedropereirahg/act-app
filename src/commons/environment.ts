export default {
  CACHE_CONTROL: process.env.NEXT_PUBLIC_CACHE_CONTROL || '',
  ACTIVITIES_API_URL: process.env.NEXT_PUBLIC_ACTIVITIES_API_URL,
} as {
  CACHE_CONTROL: string;
  ACTIVITIES_API_URL: string;
}
