import { readdir } from "node:fs/promises";
import path from "node:path";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { TeamSection } from "@/components/sections/TeamSection";
import { teamLevels } from "@/data/content/cast";

export const metadata = { title: "Team", description: "Meet the team behind Ankahi." };

export const dynamic = "force-dynamic";
const extensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

async function readDirectory(directory: string) {
  try {
    return await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function getTeamMembers() {
  const root = path.join(process.cwd(), "public", "images", "team");
  const members = [];
  for (const level of teamLevels) {
    const folder = level.id;
    const files = await readDirectory(path.join(root, folder));
    for (const file of files.filter((entry) => entry.isFile() && extensions.has(path.extname(entry.name).toLowerCase()))) {
      const baseName = path.basename(file.name, path.extname(file.name));
      const [name, ...hostelParts] = baseName.split("_");
      members.push({ id: `${folder}-${file.name}`, name: name.replace(/[-]+/g, " "), role: level.title, bio: hostelParts.length ? `Hostel: ${hostelParts.join(" ").replace(/[-]+/g, " ")}` : undefined, photo: { public_url: `/images/team/${folder}/${encodeURIComponent(file.name)}` } });
    }
  }
  return members;
}

export default async function CastPage() { const members = await getTeamMembers(); return <><Navbar /><main><TeamSection members={members} /></main><Footer /></>; }
