"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  const handleLogout = () => {
    // localStorage.removeItem("authToken");
    router.push("/");
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ marginBottom: "20px" }}>
        Logout
      </Button>

      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {products.map((product) => (
          <Card key={product.id} sx={{ maxWidth: 345, m: 2 }}>
            <CardMedia
              component="img"
              alt={product.name}
              height="auto"
              image={product.imageUrl} 
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {product.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: ${product.price}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
