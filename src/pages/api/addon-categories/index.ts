// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send("Unthroized..");
  const method = req.method;
  if (method === "POST") {
    const { name, isRequired = true, menuIds } = req.body;
    const isValid = name && menuIds.length > 0;
    if (!isValid) return res.status(400).send("Bad Requested..");
    const addonCategory = await prisma.addonCategory.create({
      data: { name, isRequired },
    });
    const newMenuAddonCategory: { menuId: number; addonCategoryId: number }[] =
      menuIds.map((item: number) => ({
        menuId: item,
        addonCategoryId: addonCategory.id,
      }));
    const menuAddonCategories = await prisma.$transaction(
      newMenuAddonCategory.map((item) =>
        prisma.menuAddonCategory.create({
          data: { menuId: item.menuId, addonCategoryId: item.addonCategoryId },
        })
      )
    );
    return res.status(200).json({ addonCategory, menuAddonCategories });
  } else if (method === "DELETE") {
    const addonCategoryId = Number(req.query.id);
    const addonCategory = await prisma.addonCategory.findFirst({
      where: { id: addonCategoryId },
    });
    if (!addonCategory) return res.status(400).send("Bad Requested..");
    await prisma.addonCategory.update({
      data: { isArchived: true },
      where: { id: addonCategoryId },
    });
    return res.status(200).send("Deleted..");
  } else if (method === "PUT") {
    const { id, name, isRequired, menuIds } = req.body;
    const isValid =
      id && name && isRequired !== undefined && menuIds.length > 0;
    if (!isValid) return res.status(400).send("Bad Requested...");
    const addonCategory = await prisma.addonCategory.update({
      data: { name, isRequired },
      where: { id },
    });
    await prisma.menuAddonCategory.deleteMany({
      where: { addonCategoryId: id },
    });
    const menuAddonCategoryData: { addonCategoryId: number; menuId: number }[] =
      menuIds.map((item: number) => ({
        addonCategoryId: id,
        menuId: item,
      }));
    const menuAddonCategories = await prisma.$transaction(
      menuAddonCategoryData.map((item) =>
        prisma.menuAddonCategory.create({
          data: { addonCategoryId: item.addonCategoryId, menuId: item.menuId },
        })
      )
    );
    return res.status(200).json({ addonCategory, menuAddonCategories });
  }
  res.status(405).send("Method Not Allowed..");
}
