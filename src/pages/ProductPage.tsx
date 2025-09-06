import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";

// Color palette
const colors = {
  light: "#DAD7CD",
  lightGreen: "#A3B18A",
  mediumGreen: "#588157",
  darkGreen: "#345A40",
  darkestGreen: "#344E41",
};

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const PageHeader = styled.h1`
  color: ${colors.darkestGreen};
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid ${colors.light};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FilterSelect = styled.select`
  padding: 10px 15px;
  border: 2px solid ${colors.light};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: ${colors.mediumGreen};
    box-shadow: 0 0 0 3px rgba(88, 129, 87, 0.2);
  }
`;

const SearchInput = styled.input`
  padding: 10px 15px;
  border: 2px solid ${colors.light};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: ${colors.mediumGreen};
    box-shadow: 0 0 0 3px rgba(88, 129, 87, 0.2);
  }

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const SortSelect = styled.select`
  padding: 10px 15px;
  border: 2px solid ${colors.light};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: ${colors.mediumGreen};
    box-shadow: 0 0 0 3px rgba(88, 129, 87, 0.2);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
`;

const ResultsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: ${colors.darkGreen};
  font-size: 1.1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.2rem;
  color: ${colors.darkestGreen};
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.2rem;
  color: #e74c3c;
  text-align: center;
  padding: 20px;
`;

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.2rem;
  color: ${colors.darkGreen};
  text-align: center;
  padding: 20px;
`;

interface ProductType {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  description: string;
  stock: number;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("name");

  // Raw product data as fallback
  const rawProducts: ProductType[] = [
    {
      id: 1,
      name: "Organic Apples",
      price: 250,
      image:
        "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      rating: 4.5,
      category: "fruits",
      description: "Fresh organic apples from local farms",
      stock: 25,
    },
    {
      id: 2,
      name: "Fresh Avocados",
      price: 320,
      image:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      rating: 4.8,
      category: "fruits",
      description: "Creamy ripe avocados",
      stock: 18,
    },
    {
      id: 3,
      name: "Strawberries",
      price: 450,
      image:
        "https://images.unsplash.com/photo-1543528176-61b239494933?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      rating: 4.7,
      category: "berries",
      description: "Sweet organic strawberries",
      stock: 12,
    },
    {
      id: 4,
      name: "Broccoli",
      price: 220,
      image:
        "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      rating: 4.3,
      category: "vegetables",
      description: "Fresh green broccoli",
      stock: 30,
    },
    {
      id: 5,
      name: "Carrots",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1445282768818-728615cc910a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      rating: 4.6,
      category: "vegetables",
      description: "Organic crunchy carrots",
      stock: 40,
    },
    {
      id: 6,
      name: "Bananas",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      rating: 4.4,
      category: "fruits",
      description: "Sweet yellow bananas",
      stock: 35,
    },
    {
      id: 7,
      name: "Spinach",
      price: 280,
      image:
        "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      rating: 4.2,
      category: "leafy-greens",
      description: "Fresh organic spinach",
      stock: 22,
    },
    {
      id: 8,
      name: "Tomatoes",
      price: 190,
      image:
        "https://images.unsplash.com/photo-1561136594-7f68413baa99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      rating: 4.5,
      category: "vegetables",
      description: "Fresh red tomatoes",
      stock: 28,
    },
  ];

  const categories = [
    "all",
    ...Array.from(new Set(rawProducts.map((product) => product.category))),
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Showing sample products.");
        setProducts(rawProducts);
        setFilteredProducts(rawProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((product) => product.category === categoryFilter);
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "name":
      default:
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredProducts(result);
  }, [products, searchTerm, categoryFilter, sortOption]);

  if (loading) {
    return (
      <Container>
        <PageHeader>Our Products</PageHeader>
        <LoadingSpinner>Loading products...</LoadingSpinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <PageHeader>Our Products</PageHeader>
        <ErrorMessage>
          <div>
            <p>{error}</p>
          </div>
        </ErrorMessage>
        <ProductGrid>
          {rawProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              rating={product.rating}
            />
          ))}
        </ProductGrid>
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader>Our Products</PageHeader>

      <FilterSection>
        <FilterGroup>
          <SearchInput
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterSelect
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories
              .filter((cat) => cat !== "all")
              .map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
          </FilterSelect>
        </FilterGroup>

        <SortSelect
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </SortSelect>
      </FilterSection>

      <ResultsInfo>
        <span>{filteredProducts.length} product(s) found</span>
        {categoryFilter !== "all" && <span>Category: {categoryFilter}</span>}
      </ResultsInfo>

      {filteredProducts.length === 0 ? (
        <EmptyState>
          <div>
            <p>No products found matching your criteria.</p>
            <p>Try adjusting your search or filters.</p>
          </div>
        </EmptyState>
      ) : (
        <ProductGrid>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              rating={product.rating}
            />
          ))}
        </ProductGrid>
      )}
    </Container>
  );
};

export default ProductPage;
