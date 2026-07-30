import { Role } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      roomNumber?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: Role;
    roomNumber?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    roomNumber?: string | null;
  }
}
