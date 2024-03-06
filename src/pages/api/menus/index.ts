// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/utils/db";
import NewMenuCategory from "@/components/NewMenuCategory";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send("Unthroized");
  const method = req.method;
  if (method === "POST") {
    const { name, price, menuCategoryIds } = req.body;
    const isValid = name && price !== undefined && menuCategoryIds.length > 0;
    if (!isValid) return res.status(400).send("Bad Requested..");
    const newMenu = await prisma.menu.create({ data: { name, price } });
    const newMenuCategoryMenu: { menuCategoryId: number; menuId: number }[] =
      menuCategoryIds.map((item: number) => ({
        menuCategoryId: item,
        menuId: newMenu.id,
      }));
    const newMenuCategoryMenus = await prisma.$transaction(
      newMenuCategoryMenu.map((item) =>
        prisma.menuCategoryMenu.create({
          data: { menuCategoryId: item.menuCategoryId, menuId: item.menuId },
        })
      )
    );
    return res.status(200).json({ newMenu, newMenuCategoryMenus });
  } else if (method === "PUT") {
    const { id, name, price, menuCategoryIds } = req.body;
    const isValid =
      id && name && price !== undefined && menuCategoryIds.length > 0;
    if (!isValid) return res.status(400).send("Bad Requested..");
    const menu = await prisma.menu.update({
      data: { name, price },
      where: { id },
    });
    await prisma.menuCategoryMenu.deleteMany({ where: { menuId: id } });
    const menuCategoryMenus = menuCategoryIds.map((item: number) => ({
      menuId: id,
      menuCategoryId: item,
    }));

    const menuCategoryMenu = await prisma.$transaction(
      menuCategoryMenus.map(
        (item: { menuId: number; menuCategoryId: number }) =>
          prisma.menuCategoryMenu.create({
            data: { menuId: item.menuId, menuCategoryId: item.menuCategoryId },
          })
      )
    );
    return res.status(200).json({ menu, menuCategoryMenu });
  } else if (method === "DELETE") {
    const menuId = Number(req.query.id);
    const menu = await prisma.menu.findFirst({ where: { id: menuId } });
    if (!menu) return res.status(400).send("Bad Requested.. ");
    await prisma.menu.update({
      data: { isArchived: true },
      where: { id: menuId },
    });
    return res.status(200).send("DELETE.");
  }
  res.status(405).send("Method Not Allowed..");
}
