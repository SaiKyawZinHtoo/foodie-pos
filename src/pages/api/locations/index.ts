// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).send("Unthroized..");
    const user = session.user;
    const email = user?.email as string;
    const dbUser = await prisma.user.findUnique({ where: { email } });
    if (!dbUser) return res.status(401).send("Unthroized..");
    const companyId = dbUser.companyId;
    const { name, address } = req.body;
    const isValid = name && address;
    if (!isValid) return res.status(400).send("Bad Requested..");
    const createdLocation = await prisma.location.create({
      data: { name, address, companyId },
    });
    return res.status(200).json(createdLocation)
  }
  res.status(405).send("Method Not Allowed..");
}
