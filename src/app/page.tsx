import { promises as fs } from "fs";
import path from "path";
import type { WeddingData } from "@/lib/data";
import WeddingPage from "@/components/WeddingPage";

export default async function Home() {
  const filePath = path.join(process.cwd(), "public", "wedding-data.json");
  const raw = await fs.readFile(filePath, "utf-8");
  const data: WeddingData = JSON.parse(raw);

  return <WeddingPage data={data} />;
}
