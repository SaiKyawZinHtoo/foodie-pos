// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nextAuth, { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).send("Unathorized");
    const user = session.user;
    const email = user?.email as string;
    const name = user?.name as string;
    const dbUser = await prisma.user.findUnique({ where: { email } });
    if (!dbUser) {
      //1. Create Company In DataBase
      const newCompanyName = "အဝစား";
      const newCompanyAddress =
        "အမှတ်(၃၇/အေ) သံလမ်း (၇)ရပ်ကွက် လှိုင်မြို့နယ် ရန်ကုန်";
      const company = await prisma.company.create({
        data: { name: newCompanyName, address: newCompanyAddress },
      });
      //2. Create user in DataBase
      await prisma.user.create({
        data: { name, email, companyId: company.id },
      });
      //3. Crate MenuCategory in DataBase
      const newMenuCategoryName = "Default Menu Category";
      const menuCategory = await prisma.menuCategory.create({
        data: { name: newMenuCategoryName, companyId: company.id },
      });
      //4. Create Menu in DataBase
      const newMenuName = "Default Menu";
      const menu = await prisma.menu.create({
        data: { name: newMenuName, price: 1000 },
      });
      //5. Connected Menu and MenuCategory in DataBase
      const menuCategoryMenu = await prisma.menuCategoryMenu.create({
        data: { menuId: menu.id, menuCategoryId: menuCategory.id },
      });
      //6. Create Addon Category in DataBase
      const newAddonCategoryName = "Default Addon Category";
      const addonCategory = await prisma.addonCategory.create({
        data: { name: newAddonCategoryName },
      });
      //7. Connected Menu and AddonCategory in DataBase
      const menuAddonCategory = await prisma.menuAddonCategory.create({
        data: { menuId: menu.id, addonCategoryId: addonCategory.id },
      });
      //8. Create New Addon in DataBase
      const newAddonNameOne = "Default Addon One";
      const newAddonNameTwo = "Default Addon Two";
      const newAddonNameThree = "Default Addon Three";
      const newAddonsData = [
        { name: newAddonNameOne, addonCategoryId: addonCategory.id },
        { name: newAddonNameTwo, addonCategoryId: addonCategory.id },
        { name: newAddonNameThree, addonCategoryId: addonCategory.id },
      ];
      const addons = await prisma.$transaction(
        newAddonsData.map((addon) => prisma.addon.create({ data: addon }))
      );
      //9. Create Location in DataBase
      const newLocationName = "စမ်းချောင်း";
      const location = await prisma.location.create({
        data: {
          name: newLocationName,
          companyId: company.id,
          address: newCompanyAddress,
        },
      });
      // 10. Create Table in DataBase
      const newTableName = "Default Table";
      const table = await prisma.table.create({
        data: { name: newTableName, locationId: location.id },
      });
      res.status(200).json({
        location,
        table,
        menuCategory,
        menu,
        menuCategoryMenu,
        addonCategory,
        menuAddonCategory,
        addons,
      });
    } else {
      const companyId = dbUser.companyId;
      const locations = await prisma.location.findMany({
        where: { companyId },
      });
      const lodcationIds = locations.map((item) => item.id);
      //နည်းနည်းမရှင်း
      const menuCategories = await prisma.menuCategory.findMany({
        where: { companyId },
      });
      const menuCategoryIds = menuCategories.map((item) => item.id);
      const menuCategoryMenu = await prisma.menuCategoryMenu.findMany({
        where: { menuCategoryId: { in: menuCategoryIds } },
      });
      const menuIds = menuCategoryMenu.map((item) => item.menuId);
      const menus = await prisma.menu.findMany({
        where: { id: { in: menuIds } },
      });
      const menuAddonCategory = await prisma.menuAddonCategory.findMany({
        where: { menuId: { in: menuIds } },
      });
      const addonCategoryIds = menuAddonCategory.map(
        (item) => item.addonCategoryId
      );
      const addonCategories = await prisma.addonCategory.findMany({
        where: { id: { in: addonCategoryIds } },
      });
      const addon = await prisma.addon.findMany({
        where: { addonCategoryId: { in: addonCategoryIds } },
      });
      const table = await prisma.table.findMany({
        where: { locationId: { in: lodcationIds } },
      });
      return res.status(200).json({
        locations,
        table,
        menuCategories,
        menus,
        addonCategories,
        addon,
      });
    }
  }

  res.status(405).send("Method Not Allowed..");
}
