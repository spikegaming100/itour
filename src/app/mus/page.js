import lamp from "../../../public/mus/lamp.svg";
import { sections4 } from "@/components/Variables";
import PageGen from "@/components/PageGen";

const Sri = () => {
  return (
    <PageGen
      path={""}
      section={sections4}
      head={
        <>
          НАУЧНО-
          <br />
          ИССЛЕДОВАТЕЛЬСКИЕ
          <br />
          ИНСТИТУТЫ
        </>
      }
      ico={lamp}
    />
  );
};

export default Sri;
