export interface Activity {
  id: string;
  title:string;
  type: "course" | "velo" | "natation";
  duration: number; // in minutes
  distance?: number; // in km
  calories?: number;
  date: string; // ISO 8601
}