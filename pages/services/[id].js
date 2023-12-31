import useSWR from "swr";
import styled from "styled-components";
import { useRouter } from "next/router";
import Flex from "@/components/Layout/Flex";
import Column from "@/components/Layout/Column";
import Cover from "@/components/Layout/Cover";
import Avatar from "@/components/Layout/Avatar";
import Card from "@/components/Layout/Card";
import Loader from "@/components/Layout/Loader";
import ActionButton from "@/components/Layout/ActionButton";
import FavoriteButton from "@/components/Layout/FavoriteButton";
import ReactMarkdown from "react-markdown";

const StyledMarkdown = styled(ReactMarkdown)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  > * {
    margin: 0;
  }
  & p,
  & ul {
    line-height: 1.616;
  }
  & ul {
    padding: 0 1rem;
  }
`;

export default function Service() {
  const router = useRouter();
  const { id } = router.query;
  const { data: service, isLoading, mutate } = useSWR(
    id ? `/api/services/${id}` : null
  );

  if (!service || isLoading) {
    return <Loader />;
  }

  const { name, price, offerer, description, image, isFavorite } = service;

  async function handleFavoriteClick(id) {
    const response = await fetch(`/api/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...service, isFavorite: !isFavorite }),
    });

    if (response.ok) {
      mutate();
    }
  }

  return (
    <Column width="700px" padding="1rem">
      <Card padding="2rem" direction="column" gap="2rem">
        <Flex as="header" direction="column" gap="1.5rem">
          <Flex as="h1" justifyContent="space-between" flex={1}>
            <span>{name}</span>
            <span>{price}$</span>
          </Flex>
          <Cover width={700} alt={name} src={image} />
          <Flex alignItems="center" gap="0.5rem" pushLast>
            Offered by
            <Avatar
              alt={offerer?.name || "J"}
              src={`https://dummyimage.com/75x75/48cae4/fff&text=${
                (offerer?.name || "J")[0]
              }`}
              size={40}
            />
            <strong>{offerer?.name}</strong>
            <Flex>
              <FavoriteButton
                isFavorite={service?.isFavorite}
                onClick={() => handleFavoriteClick(service._id)}
              />
              <ActionButton>Book Now!</ActionButton>
            </Flex>
          </Flex>
        </Flex>
        <h2>Service Details</h2>
        <StyledMarkdown>{description}</StyledMarkdown>
      </Card>
    </Column>
  );
}
