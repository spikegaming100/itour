import honeycomb from "../../../public/sci/honeycomb.svg";
import path from "../../../public/sci/path.svg";
import { sections3 } from "@/components/Variables";
import PageGen from "@/components/PageGen";

const Sri = () => {
  return (
    <PageGen
      path={path}
      section={sections3}
      head={<>НАУКОГРАДЫ</>}
      ico={honeycomb}
    />
  );
};

export default Sri;
