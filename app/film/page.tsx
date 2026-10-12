import { readdir } from "node:fs/promises";
import path from "node:path";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { FilmGallery } from "@/components/sections/FilmGallery";

export const metadata = { title: "Film", description: "Ankahi's photographic and visual archive." };
export const dynamic = "force-dynamic";

const extensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

async function getCollectionImages() {
  const directory = path.join(process.cwd(), "public", "images", "collections");
  const files = await readdir(directory, { withFileTypes: true });
  return files.filter((file) => file.isFile() && extensions.has(path.extname(file.name).toLowerCase())).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true })).map((file) => ({ id: file.name, src: `/images/collections/${encodeURIComponent(file.name)}`, alt: path.basename(file.name, path.extname(file.name)).replace(/[-_]+/g, " ") }));
}

export default async function FilmPage() { const assets = await getCollectionImages(); return <><Navbar /><main><FilmGallery assets={assets} /></main><Footer /></>; }
