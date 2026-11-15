import construct from "@/assets/db/construct.svg";
import path from "@/assets/sri/path.svg";
import { sections2 } from "@/components/Variables";
import PageGen from "@/components/PageGen";

const Sri = () => {
  return (
    <PageGen
      path={path}
      section={sections2}
      head={
        <>
          КОНСТРУКТОРСКИЕ
          <br />
          БЮРО
        </>
      }
      ico={construct}
    />
  );
};

export default Sri;
