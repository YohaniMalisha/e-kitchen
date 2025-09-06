import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Color Palette
const colors = {
  lightGreen: "#A3B18A",
  mediumGreen: "#588157",
  darkGreen: "#345A40",
};

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const TitleSection = styled.div`
  text-align: center;
  margin: 50px 0;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: ${colors.darkGreen};
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${colors.mediumGreen};
  margin-top: 10px;
`;

const OfferGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const OfferCard = styled.div`
  border: 1px solid ${colors.lightGreen};
  border-radius: 8px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const OfferImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
`;

const OfferDetails = styled.div`
  margin-top: 15px;
`;

const OfferTitle = styled.h3`
  color: ${colors.darkGreen};
  font-size: 1.5rem;
`;

const OfferDescription = styled.p`
  color: ${colors.mediumGreen};
  font-size: 1rem;
  margin-top: 10px;
`;

const OfferPrice = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${colors.darkGreen};
  margin-top: 10px;
`;

const Button = styled.button`
  background: ${colors.mediumGreen};
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${colors.darkGreen};
  }
`;

const OffersPage: React.FC = () => {
  const navigate = useNavigate();

  // Mock data for offers
  const offers = [
    {
      id: 1,
      title: "Buy One Get One Free - Organic Avocados",
      description: "Get a free avocado when you buy one. Limited time only!",
      price: "$4.99",
      image:
        "https://images.unsplash.com/photo-1558449714-9b91a1a381e0?crop=entropy&cs=tinysrgb&fit=max&ixid=M3wzNjYzM3wwfDF8c2VhcmNofDEyfHxhdm9jYWRvfGVufDB8fHx8fDE2NzkzNzQwMjc&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
      id: 2,
      title: "10% Off on All Organic Apples",
      description: "Enjoy a 10% discount on all apple products. Fresh and tasty!",
      price: "$2.99",
      image:
        "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?crop=entropy&cs=tinysrgb&fit=max&ixid=M3wzNjYzM3wwfDF8c2VhcmNofDJ8fG9yYW5pYyBhcHBsZXN8ZW58MHx8fHwxNjc5MjM4Mzc4&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
      id: 3,
      title: "20% Off on Strawberries",
      description: "Save 20% on fresh strawberries this week only.",
      price: "$3.99",
      image:
        "https://images.unsplash.com/photo-1592862529571-b5e8f720a94a?crop=entropy&cs=tinysrgb&fit=max&ixid=M3wzNjYzM3wwfDF8c2VhcmNofDN8fHN0cmF3YmVyaWVzfGVufDB8fHx8fDE2NzkwNjUyNzA&ixlib=rb-1.2.1&q=80&w=400",
    },
  ];

  return (
    <Container>
      <TitleSection>
        <Title>Exclusive Offers</Title>
        <Subtitle>Check out the latest discounts and promotions on fresh produce!</Subtitle>
      </TitleSection>

      <OfferGrid>
        {offers.map((offer) => (
          <OfferCard key={offer.id}>
            <OfferImage src={offer.image} alt={offer.title} />
            <OfferDetails>
              <OfferTitle>{offer.title}</OfferTitle>
              <OfferDescription>{offer.description}</OfferDescription>
              <OfferPrice>{offer.price}</OfferPrice>
              <Button onClick={() => navigate(`/product/${offer.id}`)}>
                Shop Now
              </Button>
            </OfferDetails>
          </OfferCard>
        ))}
      </OfferGrid>
    </Container>
  );
};

export default OffersPage;
