import BackofficeLayout from "@/components/backofficeLayout";
import { useRouter } from "next/router";

const UpdateMenu = () => {
  const router = useRouter();
  const menuId = router.query.id;

  return (
    <BackofficeLayout>
      <h1>Menu Id To Update: {menuId}</h1>
    </BackofficeLayout>
  );
};

export default UpdateMenu;
