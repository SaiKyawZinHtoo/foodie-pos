import { PrismaClient } from "@prisma/client";

//အဲ့အပိုင်းမှာကြတော့ database ထဲမှာသွားရေးလို့ရအောင်လို့ကို လုပ်ပေးတဲ့အပိုင်း
export const prisma = new PrismaClient();
