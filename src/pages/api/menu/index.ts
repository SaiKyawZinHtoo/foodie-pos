import type { NextApiRequest, NextApiResponse } from "next";

interface Menu {
  id: number;
  name: string;
  price: number;
  isArchived: boolean;
  assetUrl: string;
}

const menus: Menu[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const isValid = req.body.name;
    if (!isValid) return res.status(400).send("Bad Request .");
    const newMenuId = menus.length === 0 ? 1 : menus[menus.length - 1].id + 1;
    const isArchived = false;
    const newMenu = {
      ...req.body,
      id: newMenuId,
      assetUrl:
        "https://domf5oio6qrcr.cloudfront.net/medialibrary/3440/conversions/w0714a16207251033667-thumb.jpg",
      isArchived,
    };
    menus.push(newMenu);
    return res.send(menus);
  } else if (req.method === "GET") {
    return res.send(menus);
  }
  res.status(405).send("Invalid Method");
}
