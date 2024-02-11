// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nextAuth, { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send("Unathorized");
  const user = session.user;
  const email = user?.email as string;
  const name = user?.name as string;
  const dbUser = await prisma.user.findUnique({ where: { email } });
  if (!dbUser) {
    const newUser = await prisma.user.create({ data: { name, email } });
    return res.status(200).send(newUser);
  }
  res.status(200).json(user);
}
