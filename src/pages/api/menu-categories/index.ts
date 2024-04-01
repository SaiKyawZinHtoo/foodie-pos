// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send("Unthroized..");
  const method = req.method;
  if (method === "POST") {
    const { name, locationId } = req.body;
    const isValid = name && locationId;
    if (!isValid) return res.status(400).send("Bad Requested..");
    const location = await prisma.location.findFirst({
      where: { id: locationId },
    });
    if (!location) return res.status(400).send("Bad Requested...");
    const menuCategory = await prisma.menuCategory.create({
      data: { name, companyId: location.companyId },
    });
    return res.status(200).json(menuCategory);
  } else if (method === "PUT") {
    const { id, name, locationId } = req.body;
    const isValid = id && name;
    if (!isValid) return res.status(400).send("Bad Requested..");
    const exist = await prisma.menuCategory.findFirst({ where: { id } });
    if (!exist) return res.status(400).send("Bad Requested...");
    const menuCategory = await prisma.menuCategory.update({
      data: { name },
      where: { id },
    });
    return res.status(200).json({ menuCategory });
  } else if (method === "DELETE") {
    const menuCategoryId = Number(req.query.id);
    const menuCategory = await prisma.menuCategory.findFirst({
      where: { id: menuCategoryId },
    });
    if (!menuCategory) return res.status(400).send("Bad Requested...");
    /*
    const menuCategoryMenu = await prisma.menuCategoryMenu.findMany({
      where: { menuCategoryId },
    });
    const menuIds = menuCategoryMenu.map((item) => item.menuId);
    menuIds.forEach(async (menuId: number) => {
      const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
        where: { menuId, isArchived: false },
      });
      if (menuCategoryMenus.length === 1) {
        //one menu is connected to only one menu category
        await prisma.menuCategoryMenu.updateMany({
          data: { isArchived: true },
          where: { menuId, menuCategoryId },
        });
        //menuAddonCategory
        await prisma.menuAddonCategory.updateMany({
          data: { isArchived: true },
          where: { menuId },
        });
      } else {
        //one menu is connected to many menu categories
        await prisma.menuCategoryMenu.updateMany({
          data: { isArchived: true },
          where: { id: menuCategoryId },
        });
      }
    });*/
    await prisma.menuCategory.update({
      data: { isArchived: true },
      where: { id: menuCategoryId },
    });
    return res.status(200).send("Deleted...")
  }
  res.status(405).send("Method Not Allowed..");
}
