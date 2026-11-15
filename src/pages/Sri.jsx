import science from "@/assets/sri/science.svg";
import path from "@/assets/sri/path.svg";
import { sections1 } from "@/components/Variables";
import PageGen from "@/components/PageGen";

const Sri = () => {
  return (
    <PageGen
      path={path}
      section={sections1}
      head={
        <>
          НАУЧНО-
          <br />
          ИССЛЕДОВАТЕЛЬСКИЕ
          <br />
          ИНСТИТУТЫ
        </>
      }
      ico={science}
    />
  );
};

export default Sri;
