import { Container, ImageContainer } from "./style";
import { Logo } from "../assets";
import Image from "next/image";
import { CustomText } from "../styles/globalComponents";
import { api } from "@/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "CITi!" });
  const createExample = api.example.create.useMutation();
  const getAllExamples = api.example.getAll.useQuery();

  return (
    <Container>
      <ImageContainer>
        <Image src={Logo} alt="" />
      </ImageContainer>
      <CustomText bold white size="40px" margin="20px 0">
        NextJS Boilerplate
      </CustomText>
      <CustomText regular white secondary>
        Made with <strong>&lt; &#x0002F; &gt;</strong> and{" "}
        <strong>&hearts;</strong> by CITi
      </CustomText>
      <CustomText regular white secondary>
        {hello.data?.greeting}
      </CustomText>
      <button
        onClick={async () => {
          await createExample.mutateAsync({ name: "CITi" });
          getAllExamples.refetch();
        }}
      >
        Create
      </button>
      {getAllExamples.data?.map((example) => (
        <CustomText key={example.id} regular white secondary>
          {example.name}
        </CustomText>
      ))}
    </Container>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
