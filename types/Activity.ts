export interface Activity {
  id: string;
  title: string;
  type: "course" | "velo" | "natation";
  duration: number;
  date: string;
}