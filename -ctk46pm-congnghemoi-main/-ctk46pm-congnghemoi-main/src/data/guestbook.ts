export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export const guestbookEntries: GuestbookEntry[] = [
  {
    id: "1",
    name: "Nguyen Van B",
    message: "Website dep qua! Chuc ban thanh cong nhe!",
    createdAt: new Date("2025-03-01").toISOString(),
  },
  {
    id: "2",
    name: "Tran Thi C",
    message: "Rat an tuong voi portfolio cua ban. Keep going!",
    createdAt: new Date("2025-03-05").toISOString(),
  },
  {
    id: "3",
    name: "Le Van D",
    message: "Minh cung dang hoc Next.js, mong duoc giao luu!",
    createdAt: new Date("2025-03-10").toISOString(),
  },
];
