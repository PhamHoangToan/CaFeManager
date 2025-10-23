export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

/**
 * API fetch helper dùng cho cả JSON và multipart/form-data
 */
export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${url}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    // Nếu API trả về JSON có code khác 200
    const data = await res.json();

    if (!res.ok || data?.code === 403) {
      console.error("❌ API error:", data);
      throw new Error(data?.message || `HTTP error! Status: ${res.status}`);
    }

    return data as T;
  } catch (err) {
    console.error("❌ apiFetch catch:", err);
    // Trả fallback rỗng để tránh Uncaught Promise Rejection
    return [] as T;
  }
}
