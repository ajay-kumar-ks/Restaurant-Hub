import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[500]
            : theme.palette.grey[800],
        p: 6,
      }}
    >
     
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Comapany
            </Typography>
           
            {/* <Typography variant="body2" color="text.secondary">
               We are here to provide best foods for you... make you better feel for finding food in unknown area.. find Your dream food with Us.
            </Typography> */}
            <Typography variant="body2" color="text.secondary">
              about us
            </Typography>
            <Typography variant="body2" color="text.secondary">
               founder
            </Typography>
            <Typography variant="body2" color="text.secondary">
              contact us
            </Typography>
            <Typography variant="body2" color="text.secondary">
                jobs
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Community
            </Typography>
            <Typography variant="body2" color="text.secondary">
                restaurenters
            </Typography>
            <Typography variant="body2" color="text.secondary">
                vlogers
            </Typography>
            <Typography variant="body2" color="text.secondary">
                advertising
            </Typography>
            <Typography variant="body2" color="text.secondary">
                investers
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              Konnathday Beenamol Road ,21 th Building
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: grub@foods.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 234 567 8901
            </Typography> */}
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
               Grub
            </Typography>
           
            {/* <Typography variant="body2" color="text.secondary">
               We are here to provide best foods for you... make you better feel for finding food in unknown area.. find Your dream food with Us.
            </Typography> */}
            <Typography variant="body2" color="text.secondary">
              terms
            </Typography>
            <Typography variant="body2" color="text.secondary">
               conditions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              privacy policy
            </Typography>
            <Typography variant="body2" color="text.secondary">
                location
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://grub.com/">
              grub
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}