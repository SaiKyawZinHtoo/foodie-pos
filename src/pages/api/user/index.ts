import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const menthod = req.method;
  if (menthod === "GET") {
    const users = await prisma.user.findMany({where: {isArchived: false}});
    return res.send(users);
  } else if (menthod === "POST") {
    const { name, email } = req.body;
    const isValid = name && email;
    if (!isValid) return res.status(400).send("Bad Request. ");
    const user = await prisma.user.create({ data: { name, email } });
    return res.send(user);
  } else if (menthod === "PUT") {
    const { id } = req.body;
    await prisma.user.update({ data: { isArchived: true }, where: { id } });
    return res.send("OK")
  }
  res.status(405).send("Invalid Method");
};

export default handler;
