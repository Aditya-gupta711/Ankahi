export type TeamLevel = {
  id: string;
  title: string;
  count: number;
};

export const teamLevels: TeamLevel[] = [
  { id: "president", title: "President", count: 1 },
  { id: "secretary", title: "Secretary", count: 1 },
  { id: "panel-members", title: "Panel Members", count: 5 },
  { id: "directors", title: "Directors", count: 6 },
  { id: "representatives", title: "Representatives", count: 16 },
];
