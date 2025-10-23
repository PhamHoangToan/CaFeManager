export type Province = {
  id: string;
  province: string;
  licensePlates: string[];
  wards: { name: string; mergedFrom?: string[] }[];
};

export async function fetchAllProvinces(): Promise<Province[]> {
  const res = await fetch("https://vietnamlabs.com/api/vietnamprovince");
  const json = await res.json();
  if (!json.success) throw new Error("Failed to load provinces");
  // Khi endpoint trả về mảng
  return json.data as Province[];
}

export async function fetchProvinceByName(provinceName: string): Promise<Province> {
  const url = `https://vietnamlabs.com/api/vietnamprovince?province=${encodeURIComponent(provinceName)}`;
  const res = await fetch(url);
  const json = await res.json();
  if (!json.success) throw new Error("Failed to load province " + provinceName);
  return json.data as Province;
}
