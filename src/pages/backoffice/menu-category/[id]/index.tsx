import BackofficeLayout from "@/components/backofficeLayout";
import { useRouter } from "next/router";

const UpdateMenuCategory = () => {
  const router = useRouter();
  const menuCategoryId = router.query.id;

  return (
    <BackofficeLayout>
      <h1>Menu Category Id To Update: {menuCategoryId}</h1>
    </BackofficeLayout>
  );
};

export default UpdateMenuCategory;
