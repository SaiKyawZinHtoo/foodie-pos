import { useRouter } from "next/router";
import React from "react";

const UpdateMenuPage = () => {
  const router = useRouter();
  const menuId = router.query.id;
  console.log("MenuId: ", menuId);

  return <h1>Update Menu Page: {menuId}</h1>;
};

export default UpdateMenuPage;
