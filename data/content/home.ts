import type { MediaItem } from "@/types/content";

export const heroSlides: MediaItem[] = [
  { id: "hero-stage", type: "image", category: "background", src: "/images/stage/1.JPG", alt: "Actors performing beneath a warm theatre curtain", width: 3936, height: 2216 },
  { id: "hero-arpiet", type: "image", category: "background", src: "/images/home/arpiet.png", alt: "Ankahi performers presenting Arpiet" },
  { id: "hero-mime", type: "image", category: "background", src: "/images/stage/3.png", alt: "Two performers in mime makeup facing each other on stage", width: 1536, height: 1024 },
];

export type ActCategory = {
  id: string;
  name: string;
  image: string;
  alt: string;
  description: string;
};

export const actCategories: ActCategory[] = [
  { id: "street", name: "Street", image: "/images/stage/1.JPG", alt: "Actors performing on a theatre stage", description: "The street is the stage, and everyone passing by is invited into the scene.\nThere is no proscenium to separate the performer from the public.\nSimple props, strong bodies, and louder voices carry the story outward.\nA crowd can become a chorus, a witness, or part of the action itself.\nHere, theatre meets the everyday and turns a public space into a conversation." },
  { id: "monoact", name: "Monoact", image: "/images/home/acts/monoact.png", alt: "A monoact performer beneath theatrical curtains", description: "One performer steps into the light and carries an entire world alone.\nA voice can become a memory, an argument, a stranger, or a lost friend.\nThe body shifts, the silence deepens, and one character reveals many selves.\nWith no ensemble to hide behind, every pause becomes part of the drama.\nMonoact is the intimate art of making one presence fill the room." },
  { id: "mime", name: "Mime", image: "/images/home/acts/mime.jpg", alt: "Mime performers in black clothing on stage", description: "Mime tells its story through the body before a word is spoken.\nA gesture can open a door, carry a weight, or draw an invisible line.\nFacial expression, rhythm, balance, and breath become the vocabulary.\nThe audience completes the unseen world with its own imagination.\nIn the quiet, movement becomes precise, playful, and impossible to ignore." },
  { id: "stage", name: "Stage", image: "/images/home/acts/stage.JPG", alt: "Ankahi members performing a stage scene", description: "The stage gathers actors, text, light, sound, costume, and space into one living world.\nA rehearsal turns an empty room into a place with history, conflict, and consequence.\nEvery entrance, pause, and shift of focus is shaped for the audience in front of it.\nAn ensemble learns to make separate bodies breathe as one story.\nWhen the lights rise, the imagined world becomes present, shared, and real." },
];
